import React, { useState } from 'react';
import { Text } from '@chakra-ui/react';

export const PATH_PROFILE =
  'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/';
export const PATH_PROFILE_PFP = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/pfp/';
export const PATH_PROFILE_PFP_DEFAULT = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/pfp/default.png';
export const PATH_PROFILE_SUFFIX = '.json';
export const PATH_PROFILE_PFP_SUFFIX = '.png';
export const PATH_TEST = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/terra1upleyfx24jehpgfy9d79d9scps20ffuf6vy706.json';

const MyForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const validateEmail = (email: string) => {
    // add your email validation logic here
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name || !formState.email) {
      setError('Name and email are required fields');
      return;
    }
    const validationResult = validateEmail(formState.email);
    if (validationResult === false) {
      setError('Invalid email address');
    } else {
      setError(null);
      alert('Form submitted successfully\n' + JSON.stringify(formState, null, 2));
    }
  };

  const handleReset = () => {
    setFormState({
      name: '',
      email: ''
    });
    setError(null);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Name*: 
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email*:
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </label>
      {error && <p>{error}</p>}
      <br />
      <button type="submit">Submit</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
    <div>
      <Text>* are required fields</Text>
    </div>
    </>
  );
};

export default MyForm;