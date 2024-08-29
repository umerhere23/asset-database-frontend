import * as Yup from "yup";

const memberFormvalidationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required("Company Name is required")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Company Name should only contain letters, numbers, and spaces"
    ),
  noOfEmployees: Yup.number()
    .positive("Number of Employees must be positive")
    .integer("Number of Employees must be an integer"),
  riskManager: Yup.string()
    .required("Risk Manager is required")
    .oneOf(
      ["internal", "external"],
      "Risk Manager must be either internal or external"
    ),
  riskManagerName: Yup.string().when("riskManager", {
    is: "external",
    then: () =>
      Yup.string().required(
        "Risk Manager Name is required when Risk Manager is external"
      ),
    otherwise: () => Yup.string().notRequired(),
  }),
  pricingRM: Yup.string().when("riskManager", {
    is: "external",
    then: () =>
      Yup.string().required(
        "Pricing RM is required when Risk Manager is external"
      ),
    otherwise: () => Yup.string().notRequired(),
  }),
  complianceOfficer: Yup.string()
    .required("Compliance Officer is required")
    .oneOf(
      ["internal", "external"],
      "Compliance Officer must be either internal or external"
    ),
  complianceOfficerName: Yup.string().when("complianceOfficer", {
    is: "external",
    then: () =>
      Yup.string().required(
        "Compliance Officer Name is required when Compliance Officer is external"
      ),
    otherwise: () => Yup.string().notRequired(),
  }),
  pricingCO: Yup.number().when("complianceOfficer", {
    is: "external",
    then: () =>
      Yup.string().required(
        "Pricing CO is required when Compliance Officer is external"
      ),
    otherwise: () => Yup.string().notRequired(),
  }),
  website: Yup.string().matches(
    /^https?:\/\/[^\s$.?#].[^\s]*$/,
    "Website must be a valid URL"
  ),
  officePhone: Yup.string().matches(
    /^[0-9\s\-()+]+$/,
    "Office Phone must be a valid phone number"
  ),
  genericMail: Yup.string().email("Generic Mail must be a valid email"),
  notes: Yup.string()
    .min(10, "Notes must be at least 10 characters")
    .max(1000, "Notes cannot exceed 1000 characters"),
  logo: Yup.string(),
  attachments: Yup.array().of(Yup.string()),
  activitiesAllowed: Yup.array().of(
    Yup.string().oneOf(
      [
        "advisoryMandate",
        "discretionary",
        "investmentManagement",
        "brokerage",
        "productDistribution",
        "investmentManagement_deminimis",
      ],
      "Invalid activity allowed"
    )
  ),
  finmaStatus: Yup.array().of(
    Yup.string()
      .oneOf(
        ["assetManager", "fundManager", "OAR", "pending", "trustee", null],
        "Invalid FINMA status"
      )
      .nullable()
  ),
  specialties: Yup.array().of(Yup.string()),
  // persons: Yup.array().of(Yup.string().required('Each person is required')), // Assuming IDs are strings
  // projects: Yup.array().of(Yup.string().required('Each project is required')), // Assuming IDs are strings
});

const productValidationSchema = Yup.object().shape({
  isin: Yup.string().required("ISIN is required"),
  productName: Yup.string(),
  assetClass: Yup.string(),
  inHouse: Yup.boolean(),
  shortDescription: Yup.string(),
  currency: Yup.string(),
  navFrequency: Yup.string(),
  navLiquidity: Yup.string(),
  retro: Yup.string(),
});

const updateProductValidationSchema = Yup.object().shape({
  productName: Yup.string(),
  assetClass: Yup.string(),
  inHouse: Yup.boolean(),
  shortDescription: Yup.string(),
  currency: Yup.string(),
  navFrequency: Yup.string(),
  navLiquidity: Yup.string(),
  retro: Yup.string(),
});

const projectValidationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project Name is required"),
  projectScope: Yup.string(),
  projectMembers: Yup.number()
    .typeError("Project Members must be a number")
    .positive("Project Members must be a positive number")
    .integer("Project Members must be an integer"),
  projectDescription: Yup.string(),
});

const personValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string(),
  dateOfBirth: Yup.date(),
  phone: Yup.string(),
  mail: Yup.string().email("Invalid email").notRequired(),
  role: Yup.string(),
});

const custodianValidationSchema = Yup.object({
  custodianName: Yup.string().required("Custodian Name is required"),
  custodianCity: Yup.string().required("Custodian City is required"),
  contactPerson: Yup.string().required("Contact Person is required"),
});

const custodianPricingValidationSchema = Yup.object({
  retro: Yup.boolean(),
  allInFee: Yup.number().positive("Must be a positive number").nullable(),
  discountStandardPricing: Yup.number()
    .positive("Must be a positive number")
    .nullable(),
  ticketFee: Yup.number().positive("Must be a positive number").nullable(),
  introFee: Yup.number().positive("Must be a positive number").nullable(),
  notes: Yup.string(),
});

const CreateUservalidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["admin", "user"], "Select a valid role")
    .required("Role is required"),
});

const updateUservalidationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Enter a valid email"),
  password: Yup.string().min(
    8,
    "Password should be of minimum 8 characters length"
  ),
  role: Yup.string().oneOf(["admin", "user"], "Select a valid role"),
});

const specialityValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Speciality name is required")
    .min(3, "Speciality name must be at least 3 characters")
    .max(50, "Speciality name must not exceed 50 characters"),
});

export {
  memberFormvalidationSchema,
  productValidationSchema,
  updateProductValidationSchema,
  projectValidationSchema,
  personValidationSchema,
  custodianValidationSchema,
  custodianPricingValidationSchema,
  CreateUservalidationSchema,
  updateUservalidationSchema,
  specialityValidationSchema,
};
