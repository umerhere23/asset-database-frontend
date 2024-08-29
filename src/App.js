import { Box } from "@mui/material";
import DashBoard from "./views/DashBoard/DashBoard";
import { Routes, Route, useNavigate } from "react-router-dom";
import MemberForm from "./views/MemberForm/MemberForm";
import AddDetailsPage from "./views/AddDetailsForm/AddDetailsForm";
import PersonForm from "./views/PersonForm/PersonForm";
import ProjectForm from "./views/ProjectForm/ProjectForm";
import ProductForm from "./views/ProductForm/ProductForm";
import Login from "./views/Login/Login";
import CustodianForm from "./views/CustodianForm/CustodianForm";
import Reports from "./views/Reports/Reports";
import { useEffect } from "react";
import Products from "./views/Products/Products";
import Projects from "./views/Projects/Projects";
import Persons from "./views/Persons/Persons";
import Members from "./views/Members/Members";
import Users from "./views/Users/Users";
import Custodians from "./views/Custodians/Custodians";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProductForm from "./views/ProductForm/UpdateProductForm";
import UpdatePersonForm from "./views/PersonForm/UpdatePersonForm";
import CreateUserForm from "./views/CreateUserForm/CreateUserForm";
import UpdateUserForm from "./views/UpdateUserForm/UpdateUserForm";
import UpdateProjectForm from "./views/ProjectForm/UpdateProjectForm";
import UpdateCustodianForm from "./views/CustodianForm/UpdateCustodianForm";
import CustodianBanks from "./views/CustodianBanks/CustodianBanks";
import CustodianBankForm from "./views/CustodianBanks/CustodianBankForm";
import UpdateCustodianBankForm from "./views/CustodianBanks/updateCustodianFrom";
import UpdateMemberForm from "./views/Members/UpdateMemberForm";
import OtherProducts from "./views/OtherMembersData/Products/OtherProducts";
import OtherProjects from "./views/OtherMembersData/Projects/OtherProjects";
import OtherPersons from "./views/OtherMembersData/Persons/OtherPersons";
import OtherCustodians from "./views/OtherMembersData/Custodians/OtherCustodianPricing";
import OtherProductsDetail from "./views/OtherMembersData/Products/OtherProductsDetail";
import OtherProjectDetail from "./views/OtherMembersData/Projects/OtherProjectDetail";
import OtherPersonDetail from "./views/OtherMembersData/Persons/OtherPersonDetail";
import OtherCustodianPricingDetail from "./views/OtherMembersData/Custodians/OtherCustodianPricingDetail";
import Specialities from "./views/Specialities/Specialities";
import SpecialityForm from "./views/Specialities/SpecialityForm";
import UpdateSpecialityForm from "./views/Specialities/UpdateSpecialityForm";
import MembersUserView from "./views/Members/MembersUserView";

const query = new QueryClient();

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate("/login");
  }, []);
  return (
    <QueryClientProvider client={query}>
      <Box className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          {/* <Route
            path="/SignUp"
            element={
              <>
                <SignUp />
              </>
            }
          /> */}
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="/dashboard/add_details" element={<AddDetailsPage />} />
            <Route path="/dashboard/add_member" element={<MemberForm />} />
            <Route path="/dashboard/add_person" element={<PersonForm />} />
            <Route path="/dashboard/add_project" element={<ProjectForm />} />
            <Route path="/dashboard/add_product" element={<ProductForm />} />
            <Route
              path="/dashboard/add_custodian"
              element={<CustodianForm />}
            />
            <Route
              path="/dashboard/add_speciality"
              element={<SpecialityForm />}
            />
            <Route path="/dashboard/manage_users" element={<Users />} />
            <Route
              path="/dashboard/products/:id"
              element={<UpdateProductForm />}
            />
            <Route
              path="/dashboard/edit_user/:id"
              element={<UpdateUserForm />}
            />
            <Route
              path="/dashboard/edit_custodian/:id"
              element={<UpdateCustodianForm />}
            />
            <Route
              path="/dashboard/members/:id"
              element={<UpdateMemberForm />}
            />
            <Route
              path="/dashboard/projects/:id"
              element={<UpdateProjectForm />}
            />
            <Route
              path="/dashboard/persons/:id"
              element={<UpdatePersonForm />}
            />
            <Route
              path="/dashboard/edit_custodianBank/:id"
              element={<UpdateCustodianBankForm />}
            />
            <Route
              path="/dashboard/edit_speciality/:id"
              element={<UpdateSpecialityForm />}
            />
            <Route path="/dashboard/add_user" element={<CreateUserForm />} />
            <Route
              path="/dashboard/add_custodianBank"
              element={<CustodianBankForm />}
            />
            <Route path="/dashboard/reports" element={<Reports />}>
              <Route
                path="/dashboard/reports/products"
                element={<Products />}
              />
              <Route
                path="/dashboard/reports/projects"
                element={<Projects />}
              />
              <Route path="/dashboard/reports/persons" element={<Persons />} />
              <Route path="/dashboard/reports/members" element={<Members />} />
              <Route
                path="/dashboard/reports/specialities"
                element={<Specialities />}
              />
              <Route
                path="/dashboard/reports/custodian"
                element={<Custodians />}
              />
              <Route
                path="/dashboard/reports/custodianBanks"
                element={<CustodianBanks />}
              />
            </Route>
            <Route
              path="/dashboard/other/products/:id"
              element={<OtherProductsDetail />}
            />
            <Route
              path="/dashboard/other/projects/:id"
              element={<OtherProjectDetail />}
            />
            <Route
              path="/dashboard/other/persons/:id"
              element={<OtherPersonDetail />}
            />
            <Route
              path="/dashboard/other/custodian/:id"
              element={<OtherCustodianPricingDetail />}
            />
            <Route path="/dashboard/other">
              <Route
                path="/dashboard/other/products"
                element={<OtherProducts />}
              />
              <Route
                path="/dashboard/other/projects"
                element={<OtherProjects />}
              />
              <Route
                path="/dashboard/other/persons"
                element={<OtherPersons />}
              />
              <Route
                path="/dashboard/other/custodian"
                element={<OtherCustodians />}
              />
              <Route
                path="/dashboard/other/Members"
                element={<MembersUserView />}
              />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
