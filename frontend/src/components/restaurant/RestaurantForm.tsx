import { useState } from "react";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import type { CreateRestaurantRequest } from "../../types/restaurant";

interface RestaurantFormProps {
  initialValues?: CreateRestaurantRequest;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (data: CreateRestaurantRequest) => Promise<void>;
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
  const navigate = useNavigate();

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
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3.5}>
        {/* Restaurant Name */}
        <TextField
          label="Restaurant Name"
          placeholder="e.g. Le Petit Bistro"
          value={formData.name}
          onChange={(event) => handleChange("name", event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <StorefrontTwoToneIcon sx={{ color: "#D4AC0D" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Address */}
        <TextField
          label="Full Address & Location"
          placeholder="e.g. 742 Evergreen Terrace, Suite 100"
          value={formData.address}
          onChange={(event) => handleChange("address", event.target.value)}
          error={Boolean(errors.address)}
          helperText={errors.address}
          multiline
          minRows={3}
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                  <LocationOnTwoToneIcon sx={{ color: "#D4AC0D" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Mobile Contact Number */}
        <TextField
          label="Contact Mobile Number (10 digits)"
          placeholder="e.g. 9876543210"
          value={formData.contact}
          onChange={(event) => {
            const value = event.target.value;
            if (/^\d{0,10}$/.test(value)) {
              handleChange("contact", value);
            }
          }}
          error={Boolean(errors.contact)}
          helperText={errors.contact || "Must be a 10-digit mobile number"}
          slotProps={{
            htmlInput: {
              inputMode: "numeric",
              maxLength: 10,
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneTwoToneIcon sx={{ color: "#D9381E" }} />
                </InputAdornment>
              ),
            },
          }}
          required
        />

        {/* Form Action Buttons */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            disabled={isSubmitting}
            sx={{ flex: 1, py: 1.4 }}
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              py: 1.4,
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "#9CA3AF",
              "&:hover": {
                borderColor: "#FFFFFF",
                color: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RestaurantForm;

