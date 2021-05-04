/* eslint-disable react/no-children-prop */
import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Link,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  isSubmitting,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import pokemonLogo from '../../assets/images/pokemonLogo.svg';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório'),
  prefixo: yup.number().required('Preenchimento obrigatório'),
});

export default function SignUp() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: '',
      prefixo: '',
    },
  });
  const handleInputNumber = (value) => setFieldValue('prefixo', value);

  return (
    <Box
      bg="var(--color-primary-dark)"
      w="100%"
      h="100vh"
      justifyContent="center"
      flexDirection="column"
      d="flex"
      alignItems="center"
    >
      <img src={pokemonLogo} alt="logo" width="15%" />
      <Box p={4} w="50em" justifyContent="center">
        <Box p={4} mt={4}>
          <Text
            color=" white"
            fontSize="5rem"
            fontFamily="Poppins"
            textAlign="center"
          >
            Crie seu cadastro como Mestre Pokémon
          </Text>
        </Box>
        <Box
          w="100%"
          d="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <FormControl id="email" p={4} isRequired>
            <FormLabel
              fontFamily="Poppins"
              color="#ddc3ff"
              fontSize="2.5em"
              textAlign="center"
            >
              Email
            </FormLabel>
            <Input
              color="white"
              textColor="whiteAlpha.900"
              fontSize="2xl"
              fontFamily="Poppins"
              size="lg"
              type="email"
              height="3.5em"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && (
              <FormHelperText
                fontSize="2.0em"
                fontFamily="Poppins"
                textColor="#e74c3c"
              >
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl id="password" p={4} isRequired>
            <FormLabel
              fontFamily="Poppins"
              color="#ddc3ff"
              fontSize="2.5em"
              textAlign="center"
            >
              Senha
            </FormLabel>
            <Input
              textColor="whiteAlpha.900"
              fontSize="2xl"
              size="lg"
              type="password"
              height="3.5em"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && (
              <FormHelperText
                fontSize="2.0em"
                fontFamily="Poppins"
                textColor="#e74c3c"
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            w="100%"
            id="username"
            p={4}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            isRequired
          >
            <FormLabel
              fontFamily="Poppins"
              color="#ddc3ff"
              fontSize="2.5em"
              textAlign="center"
            >
              Nome
            </FormLabel>
            <InputGroup
              size="lg"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <InputLeftAddon
                textColor="white"
                fontFamily="Poppins"
                bg="#6842c2"
                fontSize="2.3em"
                size="lg"
                width="8em"
                height=""
                justifyContent="center"
                children="Mestre/"
              />
              <Input
                textColor="whiteAlpha.900"
                fontFamily="Poppins"
                fontSize="2xl"
                type="username"
                height="3.5em"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            {touched.username && (
              <FormHelperText
                fontSize="2.0em"
                fontFamily="Poppins"
                textColor="#e74c3c"
              >
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box
          w="50em"
          d="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Button
            marginTop="0.2em"
            fontFamily="Poppins"
            fontSize="3em"
            size="lg"
            height="2.5em"
            colorScheme="blue"
            width="100%"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            cursor="pointer"
          >
            Cadastrar
          </Button>
          <Link
            href="/login"
            color="white"
            fontFamily="Poppins"
            marginTop="0.5em"
            fontSize="2.5em"
            justifyContent="center"
          >
            Já tem uma conta? Faça o Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
