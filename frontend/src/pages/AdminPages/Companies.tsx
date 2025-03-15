import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel as IonFilterLabel,
  IonToast,
  IonText,
  IonContent,
  IonModal,
  IonInput,
} from "@ionic/react";
import axios from "axios";
import './Companies.css';
import SearchFilterComponent from './SearchFilterComponent';

// Interface for Company Data
interface Company {
  companyName: string;
  packageOffered: number;
  roleOffered: string;
  intake: { year: number; numberOfStudents: number; roundsConducted: number }[];
  jobDescription: string;
  email: string;
  contactInfo: string;
  status: string;
  companyID : string;
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [selectedYear, setSelectedYear] = useState<string>(""); // State for selected year filter
  const [showAddModal, setShowAddModal] = useState(false);  // For adding a new company
  const [showEditModal, setShowEditModal] = useState(false);  // For editing a company
  const [ companyName , setCompanyName] = useState("");
  const [ companyID , setCompanyID] = useState("");
  const [packageOffered, setPackageOffered] = useState<number | "">("");
  const [roleOffered, setRoleOffered] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [status, setStatus] = useState("");
  const [intake, setIntake] = useState([{ year: 2023, numberOfStudents: 0, roundsConducted: 0 }]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [role , setRole] = useState("");

  // Fetch companies data
useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        setCompanies(response.data); // Update state with fetched companies
      } catch (error) {
        console.error("Error fetching companies:", error);
      }  
    };

    fetchCompanies();
  }, []);

  // Toggle show more/less information
  const toggleShowMore = (companyName: string) => {
    setShowMore((prevState) => ({
      ...prevState,
      [companyName]: !prevState[companyName],
    }));
  };

  // Filter function based on search term and selected year
  const filterCompanies = () => {
    return companies.filter((company) => {
      const matchesSearch = company.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear
        ? company.intake.some((intake) => intake.year === Number(selectedYear))
        : true;
      return matchesSearch && matchesYear;
    });
  };

  const handleFormSubmit = async () => {
    try {
      const newCompany = {
        companyName,
        companyID,
        packageOffered,
        roleOffered,
        jobDescription,
        email,
        contactInfo,
        status,
        intake,
      };

      const response = await axios.post("http://localhost:5000/api/companies", newCompany);
      if (response.status === 200) {
        setToastMessage("Company added successfully!");
        setShowToast(true);
        setShowAddModal(false); // Close the modal
        // Clear the form
        resetForm();
      }
    } catch (error) {
      setToastMessage("Error adding company.");
      setShowToast(true);
    }
  };

  const resetForm = () => {
    setCompanyName("");
    setCompanyID("");
    setPackageOffered("");
    setRoleOffered("");
    setJobDescription("");
    setEmail("");
    setContactInfo("");
    setStatus("");
    setIntake([{ year: 2023, numberOfStudents: 0, roundsConducted: 0 }]);
  };
  

  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!companyID) {
      console.error("Company ID is missing.");
      return;
    }
    const updatedCompany = {
      companyName,
      packageOffered,
      role,
      companyID,
      // Add other fields
    };
  
    try { 
      await axios.put(`http://localhost:5000/api/companies/${companyID}`, updatedCompany);
      setShowEditModal(false);
      // Optionally, refresh the list of companies or handle it based on your state
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };
  


  const handleEditCompany = (company: Company) => {
    // Populate the form fields with the selected company's details
    setCompanyName(company.companyName);
    setPackageOffered(company.packageOffered);
    setRole(company.roleOffered);
    setCompanyID(company.companyID);  // Make sure companyID is set
    setShowEditModal(true);  // Open the modal to edit the company
  };
  // const handleEditClick = (company: Company) => {
  //   setCompanyToEdit(company);  // Set the company to be edited
  //   setCompanyName(company.companyName);
  //   setPackageOffered(company.packageOffered);
  //   setRole(company.roleOffered);
  //   setCompanyID(company.companyID);
  //   setShowEditModal(true);  // Open the edit modal
  // };
  
  
  
  return (
    <div className="companies-container">
      <h1>Company Recruitment Details</h1>

      {/* Search and Filter Section */}
      <SearchFilterComponent
        onSearch={setSearchTerm}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      

      {/* Company Cards Section */}
      <IonGrid>
        <IonRow>
          {filterCompanies().map((company) => {
            // Filter latest intake (based on the current year)
            const latestIntake = company.intake[0];

            return (
              <IonCol size="12" sizeMd="4" key={company.companyName}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{company.companyName}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonLabel>
                      <strong>Package Offered:</strong> {company.packageOffered}{" "}
                      LPA
                    </IonLabel>
                    <br />
                    <IonLabel>
                      <strong>Role Offered:</strong> {company.roleOffered}
                    </IonLabel>
                    <br />
                    <IonLabel>
                      <strong>Students Placed (This Year):</strong>{" "}
                      {latestIntake.numberOfStudents}
                    </IonLabel>
                    <br />
                    <IonLabel>
                      <strong>Rounds Conducted (This Year):</strong>{" "}
                      {latestIntake.roundsConducted}
                    </IonLabel>

                    {/* Button to toggle visibility of more information */}
                    <IonButton
                      fill="clear"
                      color="primary"
                      onClick={() => toggleShowMore(company.companyName)}
                    >
                      {showMore[company.companyName]
                        ? "Show Less"
                        : "Show More"}
                    </IonButton>

                    <IonButton onClick={() =>  handleEditCompany(company)} color="secondary">
                        Edit
                    </IonButton>


                    {/* More company information, visible if the "Show More" button is clicked */}
                    {showMore[company.companyName] && (
                      <div>
                        <p>
                          <strong>Job Description:</strong>{" "}
                          {company.jobDescription}
                        </p>
                        <p>
                          <strong>Email:</strong> {company.email}
                        </p>
                        <p>
                          <strong>Contact Info:</strong> {company.contactInfo}
                        </p>
                        <p>
                          <strong>Status:</strong> {company.status}
                        </p>
                        <h3>Previous Intake Details:</h3>
                        {company.intake.slice(1).map((intake, index) => (
                          <div key={index}>
                            <p>
                              <strong>Year:</strong> {intake.year}
                            </p>
                            <p>
                              <strong>Students Placed:</strong>{" "}
                              {intake.numberOfStudents}
                            </p>
                            <p>
                              <strong>Rounds Conducted:</strong>{" "}
                              {intake.roundsConducted}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
              
            );
          })}
        </IonRow>
      </IonGrid>
      <IonButton
        onClick={() => setShowAddModal(true)} // Replace with your logic to open a modal or navigate
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          zIndex: 1000,
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
      >
        +
      </IonButton>

      <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
        <IonContent>
          <h2>Add New Company</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Company Name</IonLabel>
                  <IonInput
                    value={companyName}
                    onIonChange={(e) => setCompanyName(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Company ID</IonLabel>
                  <IonInput
                    value={companyID}
                    onIonChange={(e) => setCompanyID(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Package Offered (LPA)</IonLabel>
                  <IonInput
                    value={packageOffered}
                    onIonChange={(e) => setPackageOffered(Number(e.detail.value!))}
                    type="number"
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Role Offered</IonLabel>
                  <IonInput
                    value={roleOffered}
                    onIonChange={(e) => setRoleOffered(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Job Description</IonLabel>
                  <IonInput
                    value={jobDescription}
                    onIonChange={(e) => setJobDescription(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Contact Info</IonLabel>
                  <IonInput
                    value={contactInfo}
                    onIonChange={(e) => setContactInfo(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel>Recruitment Status</IonLabel>
                  <IonSelect
                    value={status}
                    onIonChange={(e) => setStatus(e.detail.value!)}
                  >
                    <IonSelectOption value="Completed">Completed</IonSelectOption>
                    <IonSelectOption value="Ongoing">Ongoing</IonSelectOption>
                    <IonSelectOption value="Not Started">Not Started</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonButton expand="block" onClick={handleFormSubmit}>
                  Add Company
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>

      <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
  <IonContent>
    <h2>Edit Company</h2>
    <form onSubmit={handleUpdateCompany}>
      <IonItem>
        <IonLabel position="floating">Company Name</IonLabel>
        <IonInput
          value={companyName}
          onIonChange={(e) => setCompanyName(e.detail.value!)}
          required
        />
      </IonItem>
      <IonItem>
  <IonLabel position="floating">Package Offered</IonLabel>
    <IonInput
      value={packageOffered.toString()}  // Convert the value to a string
      onIonChange={(e) => {
        const value = e.detail.value || '';  // Ensure the value is not undefined or null
        const parsedValue = value === '' ? 0 : parseFloat(value);

        // Ensure the value is a valid number or set it to 0 if invalid
        setPackageOffered(isNaN(parsedValue) ? 0 : parsedValue);
      }}
      required
    />
  </IonItem>

      <IonItem>
        <IonLabel position="floating">Role</IonLabel>
        <IonInput
          value={role}
          onIonChange={(e) => setRole(e.detail.value!)}
          required
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Company ID</IonLabel>
        <IonInput
          value={companyID}
          onIonChange={(e) => setRole(e.detail.value!)}
          required
        />
      </IonItem>

      {/* Add other fields as necessary */}
      <IonButton type="submit" expand="full" color="primary">Save Changes</IonButton>
    </form>
  </IonContent>
</IonModal>


      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />


    </div>
  );
};

export default Companies;
