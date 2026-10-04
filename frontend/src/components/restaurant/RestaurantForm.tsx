import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import type {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
} from "../../types/restaurant";

interface RestaurantFormProps {
  initialValues?: CreateRestaurantRequest;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (
    data: CreateRestaurantRequest | UpdateRestaurantRequest,
  ) => Promise<void>;
}

interface FormErrors {
  name?: string;
  address?: string;
  contact?: string;
}

const RestaurantForm = ({
  initialValues,
  submitLabel = "Save Restaurant",
  isSubmitting = false,
  onSubmit,
}: RestaurantFormProps) => {
  const [formData, setFormData] = useState<CreateRestaurantRequest>({
    name: initialValues?.name ?? "",
    address: initialValues?.address ?? "",
    contact: initialValues?.contact ?? "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    field: keyof CreateRestaurantRequest,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const name = formData.name.trim();
    const address = formData.address.trim();
    const contact = formData.contact.trim();

    // Restaurant name
    if (!name) {
      newErrors.name = "Restaurant name is required";
    } else if (name.length < 3) {
      newErrors.name = "Restaurant name must contain at least 3 characters";
    } else if (name.length > 255) {
      newErrors.name = "Restaurant name cannot exceed 255 characters";
    } else if (!/[A-Za-z]/.test(name)) {
      newErrors.name = "Restaurant name must contain letters";
    } else if (!/^[A-Za-z0-9][A-Za-z0-9\s&.'-]*$/.test(name)) {
      newErrors.name = "Restaurant name contains invalid characters";
    }

    // Address
    if (!address) {
      newErrors.address = "Address is required";
    } else if (address.length < 5) {
      newErrors.address = "Address must contain at least 5 characters";
    } else if (address.length > 1000) {
      newErrors.address = "Address cannot exceed 1000 characters";
    } else if (!/[A-Za-z]/.test(address)) {
      newErrors.address = "Please enter a valid address";
    } else if (!/[A-Za-z]{2,}/.test(address)) {
      newErrors.address = "Please enter a meaningful address";
    }

    // Mobile number
    if (!contact) {
      newErrors.contact = "Mobile number is required";
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = "Mobile number must contain exactly 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      name: formData.name.trim(),
      address: formData.address.trim(),
      contact: formData.contact.trim(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Restaurant Name"
          value={formData.name}
          onChange={(event) => handleChange("name", event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
        />

        <TextField
          label="Address"
          value={formData.address}
          onChange={(event) => handleChange("address", event.target.value)}
          error={Boolean(errors.address)}
          helperText={errors.address}
          multiline
          minRows={3}
          required
        />

        <TextField
          label="Mobile Number"
          value={formData.contact}
          onChange={(event) => {
            const value = event.target.value;

            if (/^\d{0,10}$/.test(value)) {
              handleChange("contact", value);
            }
          }}
          error={Boolean(errors.contact)}
          helperText={errors.contact}
          slotProps={{
            htmlInput: {
              inputMode: "numeric",
              maxLength: 10,
            },
          }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </Stack>
    </Box>
  );
};

export default RestaurantForm;
