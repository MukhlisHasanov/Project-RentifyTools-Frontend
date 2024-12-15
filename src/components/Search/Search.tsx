import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { addressSliceAction, addressSliceSelectors } from 'store/redux/addressSlice/addressSlice';
import { toolSliceAction, toolSliceSelectors } from 'store/redux/toolSlice/toolSlice';

import {
  SearchContainer,
  SearchInput,
  SearchButton,
  CitySuggestionList,
  CitySuggestion,
  CityInputContainer,
} from './styles';
import { AddressCityZip } from 'store/redux/addressSlice/types';
import { ToolUserResponseDto } from 'store/redux/toolSlice/types';
import { SearchProps } from './types';

function Search({ toolName, onChangeValue }: SearchProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState<AddressCityZip[]>([]);
  const [filteredTools, setFilteredTools] = useState<ToolUserResponseDto[]>([]);

  const { addressesCityZip } = useAppSelector(addressSliceSelectors.address_state);
  const { tools } = useAppSelector(toolSliceSelectors.tools_data);

  useEffect(() => {
    if (addressesCityZip.length === 0) {
      dispatch(addressSliceAction.fetchCityZipSuggestions());
    }

    dispatch(toolSliceAction.fetchTools());
  }, [dispatch, addressesCityZip]);

  useEffect(() => {
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
      const filtered = tools.filter(tool => {
        const matchesToolName = tool.title.toLowerCase().includes(toolName.toLowerCase());
        const matchesCity =
          tool.user?.address?.city?.toLowerCase() === selectedCity.toLowerCase();
        return matchesToolName && matchesCity;
      });

      setFilteredTools(filtered);

      navigate('/search-results', { state: { filteredTools } });

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
        onChange={onChangeValue}
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
              <CitySuggestion
                key={`${city}-${zipCode}`}
                onClick={() => handleCitySelect(city, zipCode)}
              >
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
