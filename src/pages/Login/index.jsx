/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-children-prop */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Link,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  isSubmitting,
} from '@chakra-ui/react';

import backIcon from '../../assets/images/back.svg';
import pokemonLogo from '../../assets/images/pokemonLogo.svg';
import { useAuth } from '../../Auth';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
});

// eslint-disable-next-line import/prefer-default-export
export default function Login() {
  const [{ login }] = useAuth();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    // eslint-disable-next-line no-shadow
    onSubmit: login,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  return (
    <Box
      bg="#9070b9"
      w="100%"
      h="100vh"
      justifyContent="center"
      d="flex"
      alignItems="center"
    >
      <Box
        p={4}
        w="50em"
        d="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <img src={pokemonLogo} alt="logo" width="50%" />
        <Box d="flex" justifyContent="flex-start" marginTop="3em">
          <Link href="/">
            <img
              src={backIcon}
              alt="return"
              width="20em"
              justifyContent="flex-start"
            />
          </Link>
        </Box>
        <Box p={4} mt={8}>
          <Text
            color=" white"
            fontSize="5.5rem"
            fontFamily="Poppins"
            textAlign="center"
          >
            Entre com seu Login
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
          <FormControl id="email" p={4} isRequired justifyContent="center">
            <FormLabel
              fontFamily="Poppins"
              color="#ddc3ff"
              fontSize="2em"
              height="2em"
              alignItems="center"
              textAlign="center"
            >
              Email
            </FormLabel>
            <Input
              textColor="whiteAlpha.900"
              fontSize="2em"
              size="lg"
              type="email"
              height="2em"
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
              fontSize="2em"
              height="2em"
              alignItems="center"
              textAlign="center"
            >
              Senha
            </FormLabel>
            <Input
              textColor="whiteAlpha.900"
              fontSize="2em"
              size="lg"
              type="password"
              height="2em"
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
            marginTop="1em"
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
            Login
          </Button>
          <Link
            href="/signup"
            color="white"
            fontFamily="Poppins"
            marginTop="0.5em"
            fontSize="2.5em"
            justifyContent="center"
          >
            Ainda não tem cadastro? Faça agora!
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
