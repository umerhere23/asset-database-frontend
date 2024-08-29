import {
  Box,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Button,
  Avatar,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { memberFormvalidationSchema } from "../../formValidations/formValidations";
import { CancelOutlined, CloudUploadOutlined } from "@mui/icons-material";
import {
  useCreateMember,
  useGetMember,
  useUpdateMember,
} from "../../hooks/Member/useMember";
import { activitiesAllowed, finmaStatuses } from "./selectData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSpecialities } from "../../hooks/Speciality/useSpeciality";

const MemberForm = () => {
  const [logo, setLogo] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [memberData, setMemberData] = useState({});
  const { data: specialities } = useGetSpecialities();
  const specialitiesOptions = specialities?.data.map((option) => {
    return { name: option.name, value: option.value };
  });

  const { data: responseData, refetch } = useGetMember();
  const navigate = useNavigate();
  const {
    mutate: updateMutate,
    isLoading: updateMemberLoading,
    isError: updateMemberError,
  } = useUpdateMember(
    () => {
      toast.info("Member Data updated successfully.");
    },
    (error) => {
      toast.error(error.message);
    }
  );
  const {
    mutate: createMutate,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useCreateMember();

  useEffect(() => {
    if (responseData?.data) {
      const { id, userId, persons, projects, ...formData } = responseData.data;
      setMemberId(id);
      formik.setValues({
        companyName: formData.companyName || "",
        noOfEmployees: formData.noOfEmployees || 1,
        riskManager: formData.riskManager || "internal",
        riskManagerName: formData.riskManagerName || "",
        pricingRM: formData.pricingRM || "",
        complianceOfficer: formData.complianceOfficer || "internal",
        complianceOfficerName: formData.complianceOfficerName || "",
        pricingCO: formData.pricingCO || 0,
        website: formData.website || "",
        officePhone: formData.officePhone || "",
        genericMail: formData.genericMail || "",
        notes: formData.notes || "",
        logo: formData.logo || "",
        attachments: formData.attachments || [],
        activitiesAllowed: formData.activitiesAllowed || [],
        finmaStatus: formData.finmaStatus || [],
        specialties: formData.specialties || [],
      });
    }
  }, [responseData]);

  const handleAttachmentsChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    setAttachments([...attachments, ...files]);
    formik.setFieldValue("attachments", [...attachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
    formik.setFieldValue("attachments", updatedAttachments);
  };

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("logo", file);
    setLogo(file.name);
  };

  const formik = useFormik({
    initialValues: {
      companyName: memberData?.data?.companyName || "",
      noOfEmployees: memberData?.data?.noOfEmployees || 1,
      riskManager: memberData?.data?.riskManager || "internal",
      riskManagerName: memberData?.data?.riskManagerName || "",
      pricingRM: memberData?.data?.pricingRM || "",
      complianceOfficer: memberData?.data?.complianceOfficer || "internal",
      complianceOfficerName: memberData?.data?.complianceOfficerName || "",
      pricingCO: memberData?.data?.pricingCO || 0,
      website: memberData?.data?.website || "",
      officePhone: memberData?.data?.officePhone || "",
      genericMail: memberData?.data?.genericMail || "",
      notes: memberData?.data?.notes || "",
      logo: memberData?.data?.logo || "",
      attachments: memberData?.data?.attachments || [],
      activitiesAllowed: memberData?.data?.activitiesAllowed || [],
      finmaStatus: memberData?.data?.finmaStatus || [],
      specialties: memberData?.data?.specialties || [],
    },
    enableReinitialize: true,
    validationSchema: memberFormvalidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form data", values);
      setLogo(null);
      setAttachments([]);

      if (!memberId) {
        createMutate(values);
      } else {
        console.log(values, "updated values");
        updateMutate({ data: values, memberId });
        // navigate("/dashboard");
      }

      // resetForm();
      // refetch();
    },
  });

  return (
    <Box className="memberForm">
      <Container>
        {error && (
          <Box sx={{ my: 2 }}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        )}
        {updateMemberError && (
          <Box sx={{ my: 2 }}>
            <Alert severity="error">{updateMemberError.message}</Alert>
          </Box>
        )}
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "1rem",
          }}
        >
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <TextField
                name="companyName"
                label="Company Name"
                variant="outlined"
                fullWidth
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.companyName &&
                  Boolean(formik.errors.companyName)
                }
                helperText={
                  formik.touched.companyName && formik.errors.companyName
                }
              />
              <TextField
                label="No of Employees"
                variant="outlined"
                type="number"
                fullWidth
                name="noOfEmployees"
                value={formik.values.noOfEmployees}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.noOfEmployees &&
                  Boolean(formik.errors.noOfEmployees)
                }
                helperText={
                  formik.touched.noOfEmployees && formik.errors.noOfEmployees
                }
              />
              <FormControl fullWidth>
                <InputLabel id="risk-manager-select">Risk Manager</InputLabel>
                <Select
                  labelId="risk-manager-select"
                  id="risk-manager-select"
                  label="Risk Manager"
                  fullWidth
                  name="riskManager"
                  value={formik.values.riskManager}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="internal">Internal</MenuItem>
                  <MenuItem value="external">External</MenuItem>
                </Select>
                {formik.touched.riskManager && formik.errors.riskManager && (
                  <FormHelperText>{formik.errors.riskManager}</FormHelperText>
                )}
              </FormControl>
              {formik.values.riskManager === "external" ? (
                <>
                  <TextField
                    label="Risk Manager Name"
                    variant="outlined"
                    fullWidth
                    name="riskManagerName"
                    value={formik.values.riskManagerName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.riskManagerName &&
                      Boolean(formik.errors.riskManagerName)
                    }
                    helperText={
                      formik.touched.riskManagerName &&
                      formik.errors.riskManagerName
                    }
                  />
                </>
              ) : null}
            </Stack>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              {formik.values.riskManager === "external" ? (
                <TextField
                  name="pricingRM"
                  type="number"
                  label="Risk Manager Pricing"
                  variant="outlined"
                  fullWidth
                  value={formik.values.pricingRM}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pricingRM && Boolean(formik.errors.pricingRM)
                  }
                  helperText={
                    formik.touched.pricingRM && formik.errors.pricingRM
                  }
                />
              ) : null}
              <FormControl fullWidth>
                <InputLabel id="complianceOfficer-select">
                  Compliance Officer
                </InputLabel>
                <Select
                  labelId="complianceOfficer-select"
                  id="complianceOfficer-select"
                  label="Compliance Officer"
                  fullWidth
                  name="complianceOfficer"
                  value={formik.values.complianceOfficer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="internal">Internal</MenuItem>
                  <MenuItem value="external">External</MenuItem>
                </Select>
                {formik.touched.complianceOfficer &&
                  formik.errors.complianceOfficer && (
                    <FormHelperText>
                      {formik.errors.complianceOfficer}
                    </FormHelperText>
                  )}
              </FormControl>
              {formik.values.complianceOfficer === "external" ? (
                <TextField
                  name="complianceOfficerName"
                  type="text"
                  label="Compaliance Officer Name"
                  variant="outlined"
                  fullWidth
                  value={formik.values.complianceOfficerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.complianceOfficerName &&
                    Boolean(formik.errors.complianceOfficerName)
                  }
                  helperText={
                    formik.touched.complianceOfficerName &&
                    formik.errors.complianceOfficerName
                  }
                />
              ) : null}
              {formik.values.complianceOfficer === "external" ? (
                <TextField
                  name="pricingCO"
                  type="number"
                  label="Compaliance Officer Pricing"
                  variant="outlined"
                  fullWidth
                  value={formik.values.pricingCO}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pricingCO && Boolean(formik.errors.pricingCO)
                  }
                  helperText={
                    formik.touched.pricingCO && formik.errors.pricingCO
                  }
                />
              ) : null}
            </Stack>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <TextField
                name="website"
                type="url"
                label="Website URL"
                variant="outlined"
                fullWidth
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />
              <TextField
                name="officePhone"
                label="Office Phone"
                variant="outlined"
                fullWidth
                value={formik.values.officePhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.officePhone &&
                  Boolean(formik.errors.officePhone)
                }
                helperText={
                  formik.touched.officePhone && formik.errors.officePhone
                }
              />
              <TextField
                name="genericMail"
                label="Generic Mail"
                variant="outlined"
                fullWidth
                value={formik.values.genericMail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.genericMail &&
                  Boolean(formik.errors.genericMail)
                }
                helperText={
                  formik.touched.genericMail && formik.errors.genericMail
                }
              />
            </Stack>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Stack>
              <TextField
                minRows={3}
                multiline
                name="notes"
                label="Notes"
                variant="outlined"
                fullWidth
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
              />
            </Stack>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="activities-select">Activities</InputLabel>
                <Select
                  labelId="activities-select"
                  id="activities-select"
                  label="Activities"
                  multiple
                  fullWidth
                  name="activitiesAllowed"
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Activities"
                    />
                  }
                  value={formik.values.activitiesAllowed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {activitiesAllowed.map(({ name, value }) => (
                    <MenuItem key={name} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.activitiesAllowed &&
                  formik.errors.activitiesAllowed && (
                    <FormHelperText>
                      {formik.errors.activitiesAllowed}
                    </FormHelperText>
                  )}
              </FormControl>
              <FormControl fullWidth>
                {/* <InputLabel id="specialties-select">Specialties</InputLabel> */}
                <Autocomplete
                  multiple
                  freeSolo
                  id="specialties-select"
                  options={specialitiesOptions?.map((option) => option.name)}
                  value={formik.values.specialties}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("specialties", newValue);
                  }}
                  onBlur={formik.handleBlur}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Specialties"
                      placeholder="Add a specialty"
                      error={
                        formik.touched.specialties &&
                        Boolean(formik.errors.specialties)
                      }
                      helperText={
                        formik.touched.specialties && formik.errors.specialties
                      }
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="finmaStatus-select">Finma Status</InputLabel>
                <Select
                  labelId="finmaStatus-select"
                  id="finmaStatus-select"
                  label="finmaStatus"
                  multiple
                  fullWidth
                  name="finmaStatus"
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Finma Status"
                    />
                  }
                  value={formik.values.finmaStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {finmaStatuses.map(({ name, value }) => (
                    <MenuItem key={name} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.finmaStatus && formik.errors.finmaStatus && (
                  <FormHelperText>{formik.errors.finmaStatus}</FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Box>
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  <CloudUploadOutlined sx={{ margin: "0 0.5rem" }} /> Upload
                  Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </Button>
                {logo && (
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Chip label={logo} />
                  </Box>
                )}
                {formik.errors.logo && formik.touched.logo && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {formik.errors.logo}
                  </Typography>
                )}
              </Box>
              <Box>
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  <CloudUploadOutlined sx={{ margin: "0 0.5rem" }} />
                  Upload Attachments
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleAttachmentsChange}
                  />
                </Button>
                <Box>
                  {attachments.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => handleRemoveAttachment(index)}
                      deleteIcon={<CancelOutlined />}
                      sx={{ mt: 2, mx: 1 }}
                    />
                  ))}
                </Box>
                {formik.errors.attachments && formik.touched.attachments && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {formik.errors.attachments}
                  </Typography>
                )}
              </Box>
            </Stack>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyItems: "end",
                justifyContent: "flex-end",
              }}
            >
              {!memberId ? (
                <>
                  <Button
                    sx={{ my: 2 }}
                    variant="contained"
                    onClick={formik.handleSubmit}
                    disabled={isLoading}
                    fullWidth
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress color="secondary" />
                      </>
                    ) : (
                      <>Create Member</>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ my: 2 }}
                    variant="contained"
                    onClick={formik.handleSubmit}
                    disabled={isLoading}
                    fullWidth
                  >
                    {updateMemberLoading ? (
                      <>
                        <CircularProgress color="secondary" />
                      </>
                    ) : (
                      <>Update Member</>
                    )}
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MemberForm;
