import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { addressSliceAction, addressSliceSelectors } from 'store/redux/AddressSlice/addressSlice';
import { toolSliceAction, toolSliceSelectors } from 'store/redux/ToolSlice/toolSlice';

import {
  SearchContainer,
  SearchInput,
  SearchButton,
  CitySuggestionList,
  CitySuggestion,
  CityInputContainer,
} from './styles';
import { AddressCityZip } from 'store/redux/AddressSlice/types';
import { ToolUserResponseDto } from 'store/redux/ToolSlice/types';

function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [toolName, setToolName] = useState('');
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState<AddressCityZip[]>([]);
  const [filteredTools, setFilteredTools] = useState<ToolUserResponseDto[]>([]);

  const { addressesCityZip } = useAppSelector(addressSliceSelectors.address_state);
  const { tools } = useAppSelector(toolSliceSelectors.tools_data);

  useEffect(() => {
    // Завантаження всіх міст і індексів на першому рендері
    if (addressesCityZip.length === 0) {
      dispatch(addressSliceAction.fetchCityZipSuggestions());
    }

    // Завантаження всіх інструментів
    dispatch(toolSliceAction.fetchTools());
  }, [dispatch, addressesCityZip]);

  useEffect(() => {
    // Фільтрація списку міст
    if (city.trim().length > 2) {
      const filtered = addressesCityZip.filter(({ city: cityName }) =>
        cityName.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses([]);
    }
  }, [city, addressesCityZip]);

  const handleCitySelect = (city: string, zipCode: string | undefined) => {
    setCity(`${city} (${zipCode || 'N/A'})`);
    setSelectedCity(city);
    setFilteredAddresses([]);
  };

  const onSearch = () => {
    if (toolName.trim() !== '') {
      // Фільтруємо інструменти за назвою та містом користувача
      const filtered = tools.filter(tool => {
        const matchesToolName = tool.title.toLowerCase().includes(toolName.toLowerCase());
        const matchesCity = tool.user?.address?.city?.toLowerCase() === selectedCity.toLowerCase();
        return matchesToolName && matchesCity;
      });

      setFilteredTools(filtered);

      // Перенаправлення на сторінку результатів
      navigate('/search-results', { state: { filteredTools } });

      setToolName('');
      setCity('');
      setSelectedCity('');
    }
  };

  const onSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        variant="standard"
        placeholder="Search tools"
        value={toolName}
        onChange={e => setToolName(e.target.value)}
        onKeyDown={onSearchEnter}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <CityInputContainer>
        <SearchInput
          variant="standard"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
        />
        {filteredAddresses.length > 0 && (
          <CitySuggestionList>
            {filteredAddresses.map(({ city, zipCode }) => (
              <CitySuggestion key={`${city}-${zipCode}`} onClick={() => handleCitySelect(city, zipCode)}>
                {city} ({zipCode || 'N/A'})
              </CitySuggestion>
            ))}
          </CitySuggestionList>
        )}
      </CityInputContainer>
      <SearchButton variant="contained" onClick={onSearch}>
        Search
      </SearchButton>
    </SearchContainer>
  );
}

export default Search;
