import { connect } from "react-redux";
import { sendQuery } from "../../actions/watson";
import { useState, Fragment } from "react";

import {
  Grid,
  GridItem,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  SkeletonText,
  Stack,
  Box,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const Query = (props) => {
  const [queryValue, updateQuery] = useState();
  const [pendingQuery, updatePendingQuery] = useState(false);
  const [contract, updateContract] = useState(["Constructed Document"]);

  const submitQuery = async () => {
    updatePendingQuery(true);
    await props.sendQuery(queryValue);
    updatePendingQuery(false);
  };

  return (
    <Grid
      templateAreas={`"header header header"
                  "nav main1 main2"
                  "nav footer footer"`}
      gridTemplateRows={"200px 1fr 30px"}
      gridTemplateColumns={"300px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem height="200px" pl="2" bg="orange.300" area={"header"}>
        <Heading>Watson Discovery ContractIQ</Heading>
        <Text>
          Watson Discovery is evolving beyond an enterprise search solution, and
          into to a powerful platform providing both document and language
          understanding to uncover hidden insights employees need when working
          on complex processes. Find out more about
          <Link href="https://www.ibm.com/au-en/cloud/watson-discovery">
            {" "}
            Watson Discovery.
          </Link>
        </Text>
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        <Heading>Workflow </Heading>
        <Text>1. Step 1</Text>
        <Text>2. Step 2</Text>
        <Text>3. Step 3</Text>
      </GridItem>
      <GridItem
        maxWidth="800px"
        height="670px"
        pl="2"
        bg="green.300"
        area={"main1"}
      >
        <InputGroup size="md" marginTop={"5px"}>
          <Input
            pr="4.5rem"
            marginRight="10px"
            value={queryValue}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Enter your query"
            onKeyDown={(e) => (e.key === "Enter" ? submitQuery() : null)}
          />
          <InputRightElement width="4.5rem" marginRight="2px">
            <Button
              h="1.75rem"
              size="sm"
              onClick={submitQuery}
              marginRight="14px"
            >
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>

        <Accordion>
          <Text fontSize={"2xl"} marginBottom="10px" marginTop="10px">
            Document Results
          </Text>
          {pendingQuery === true ? (
            <Stack>
              <SkeletonText marginBottom={"10px"} />
              <SkeletonText marginBottom={"10px"} />
              <SkeletonText marginBottom={"10px"} />
            </Stack>
          ) : props.watson.length > 0 ? (
            props.watson.map((x, idx) => (
              <AccordionItem>
                <AccordionButton>
                  <Box textAlign="left">{x.document_id}</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text
                    onClick={(e) =>
                      updateContract([...contract, e.target.innerHTML])
                    }
                  >
                    {/* #console.log(e.target.innerHTML) */}
                    {x.document_passages[0].passage_text}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))
          ) : null}
        </Accordion>
      </GridItem>
      <GridItem pl="1" width="500px" bg="green.300" area={"main2"}>
        {contract
          ? contract.map((x, idx) => (
              <Text
                id={idx}
                onClick={(e) => {
                  if (parseInt(e.target.id) !== 0) {
                    console.log(typeof e.target.id);
                    updateContract(
                      contract.filter(
                        (x, xidx) => xidx !== parseInt(e.target.id)
                      )
                    );
                  }
                }}
              >
                {x}
              </Text>
            ))
          : null}
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  watson: state.watson,
});

export default connect(mapStateToProps, { sendQuery })(Query);
