import {  Flex, HStack , chakra, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '@images/logo.svg';
import styles from "@scss/nav.module.scss";
import 'material-symbols';

const navLinks = [
    {
        label: "Button",
        icon: "push_pin",
        href: "/button"
    },
    {
        label: "Connect",
        icon: "connect_without_contact",
        href: "/connect"
    },
    {
        label: "404",
        icon: "cancel",
        href: "/missing"
    },
    {
        label: "Home",
        icon: "home",
        href: "/"
    }
];

export default function Navigation() {
  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
        <img src={Logo} className={styles['Nav-logo']} alt="logo" />
        <HStack as="nav" spacing="5">
          {navLinks.map((item, i) => (
            <Link key={i} to={item.href}>
              <Heading fontSize={30} color={'green'} p={15}><i className="material-symbols-sharp">{item.icon}</i><br />{item.label}</Heading>
            </Link>
          ))}
        </HStack>
      </Flex>
    </chakra.header>
  );
};
