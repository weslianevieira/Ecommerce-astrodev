import React, { Component} from "react";
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
  } from '@chakra-ui/react';

export default class Footer extends Component {
    render() {
        const ListHeader = ({ children }) => {
            return (
              <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
                {children}
              </Text>
            );
          };

          const SocialButton = ({ children, label, href, }) => {
          return (
            <chakra.button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={8}
              h={8}
              cursor={'pointer'}
              as={'a'}
              href={href}
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>{label}</VisuallyHidden>
              {children}
            </chakra.button>
          );
        };
        

        return(
            <>
                <Box
                  bg={'rgb(244, 244, 244)'}
                  color={'gray.700'}
                  pos='relative'
                  marginTop={['170em', '45em']}
                >
                    <Container as={Stack} maxW={['6xl']} py={10}>
                      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                        <Stack align={'flex-start'}>
                            <ListHeader>Companhia</ListHeader>
                            <Link href={'#'}>Sobre nós</Link>
                            <Link href={'#'}>Blog</Link>
                            <Link href={'#'}>Carreiras</Link>
                            <Link href={'#'}>Contate-nos</Link>
                        </Stack>

                        <Stack align={'flex-start'}>
                            <ListHeader>Suporte</ListHeader>
                            <Link href={'#'}>Central de Ajuda</Link>
                            <Link href={'#'}>Central de Trocas</Link>
                        </Stack>

                        <Stack align={'flex-start'}>
                            <ListHeader>Jurídico</ListHeader>
                            <Link href={'#'}>Política de Cookies</Link>
                            <Link href={'#'}>Política de Privacidade</Link>
                            <Link href={'#'}>Termos de Serviço</Link>
                            <Link href={'#'}>Aplicação da lei</Link>
                        </Stack>
                      </SimpleGrid>
                    </Container>
                </Box>
            </>
        )
    }
}