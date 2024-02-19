import { Flex, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, } from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Link } from "react-router-dom"

// Custom components
import Card from "../../../../components/card/Card"
import openSocket from 'socket.io-client';

import { PaginationControl } from 'react-bootstrap-pagination-control';
export default function CheckTable(props) {

  const [productlist, setproductlist] = useState()
  const [productCount, setProductCount] = useState()
  const [pages, setPage] = useState(1)

  useEffect(() => {
    fetch("iamchatpt.com:4430/admin/reservationproductlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pages: pages }) }).then(res => res.json()).then(resData => { setProductCount(resData.productCount); setproductlist(resData.products) }).catch(err => console.log(err))
    const socket = openSocket('iamchatpt.com:4430', { transports: ['websocket'] });
    socket.on('events', (data) => {
      if (data === "acceptproduct" || data === "rejectproduct") {
        fetch("iamchatpt.com:4430/admin/reservationproductlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pages: pages }) }).then(res => res.json()).then(resData => { console.log(resData.products); setProductCount(resData.productCount); setproductlist(resData.products) }).catch(err => console.log(err))
      }
    });
  }, [pages])

  const productacceptance = (id) => {
    fetch(`iamchatpt.com:4430/product/accept/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" } }).then(res => res.json()).then(resData => { }).catch(err => console.log(err))

  }
  const productreject = (id) => {
    fetch(`iamchatpt.com:4430/product/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" } }).then(res => res.json()).then(resData => { }).catch(err => console.log(err))

  }


  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          reservation Table
        </Text>

      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='0px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {productlist && productlist.map((product, index) => {
            return (
              <Tr key={index}>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      <Link to={`http://3.36.1.132:3000/product/{product.id}`}><img src={product.thumbnail} style={{ width: "100px", height: "80px" }}></img></Link>
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      {product.name}
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      {product.sale_price}
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap" }}>
                      {product.price}
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent' onClick={() => productacceptance(product.id)}>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap", color: "blue", cursor: "pointer" }}>
                      수락
                    </Text>
                  </Flex>
                </Td>
                <Td fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor='transparent' onClick={() => productreject(product.id)}>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700' style={{ whiteSpace: "nowrap", color: "red", cursor: "pointer" }}>
                      거절
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <PaginationControl
        page={pages}
        between={4}
        total={productCount}
        limit={5}
        changePage={(pages) => {
          setPage(pages)
        }}
        ellipsis={1}
      />
    </Card>
  );
}





