// SearchFilterComponent.tsx
import React from 'react';
import { IonSearchbar, IonItem, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilterComponent: React.FC<SearchFilterProps> = ({ onSearch, selectedYear, setSelectedYear }) => {
  return (
    <div className="search-filter-container">
      <IonSearchbar
        value={selectedYear}
        onIonInput={(e) => onSearch(e.detail.value!)}  // Pass search term to parent component
        debounce={500}
        placeholder="Search Companies"
        showClearButton="focus"
        animated
        style={{ width: '100%' }}
      />

      <IonItem>
        <IonLabel>Filter by Year</IonLabel>
        <IonSelect
          value={selectedYear}
          onIonChange={(e) => setSelectedYear(e.detail.value!)}
          placeholder="Select Year"
        >
          <IonSelectOption value="">All Years</IonSelectOption>
          <IonSelectOption value="2023">2023</IonSelectOption>
          <IonSelectOption value="2022">2022</IonSelectOption>
          <IonSelectOption value="2021">2021</IonSelectOption>
        </IonSelect>
      </IonItem>
    </div>
  );
};

export default SearchFilterComponent;
