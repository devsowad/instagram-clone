import { useEffect, useState } from 'react';
import faker from 'faker';

interface suggestionsType {
  name: string;
  username: string;
  avatar: string;
  email: string;
  dob: Date;
  phone: string;
  address: Faker.Address;
  website: string;
  company: Faker.Company;
}

const useSuggestions = (length: number) => {
  const [suggestions, setSuggestions] = useState<suggestionsType[]>([]);
  useEffect(() => {
    const data = [...Array(length)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
    }));
    setSuggestions(data);
  }, [length]);

  return { suggestions };
};

export default useSuggestions;
