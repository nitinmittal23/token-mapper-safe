import {
  Button,
  Text,
  Title,
  TextField,
  GenericModal,
  Select,
  ModalFooterConfirmation,
} from '@gnosis.pm/safe-react-components';
import React, { useState, useCallback, useEffect} from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { AbiItem } from 'web3-utils';

import { ContractInterface } from '../hooks/useServices/interfaceRepository';
import useServices from '../hooks/useServices';
import { ProposedTransaction } from '../typings/models';
import WidgetWrapper from './WidgetWrapper';
const Network = require('@maticnetwork/meta/network')
const network = new Network(
  "mainnet",
  "v1"
)
const posAbi = network.abi('RootChainManager', 'pos');
const posAddress = network.Main.POSContracts.RootChainManagerProxy

const plasmaAbi = network.abi('Governance')
const plasmaAddress = network.Main.Contracts.GovernanceProxy

const l1l2Abi = network.abi('StateSender')
const l1l2Address = network.Main.Contracts.StateSender

const l2l1Abi = network.abi('RootChainManager', 'pos');
const l2l1Address = network.Main.POSContracts.RootChainManagerProxy

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const StyledSelect = styled(Select)`
  width: 400px;
`;

const StyledTitle = styled(Title)`
  margin-top: 0px;
  margin-bottom: 5px;
`;

const StyledText = styled(Text)`
  margin-bottom: 15px;
`;

const ModalBody = ({ txs, deleteTx }: { txs: Array<ProposedTransaction>; deleteTx: (index: number) => void }) => {
  return (
    <>
      {txs.map((tx, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="row-reverse"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Button size="md" variant="outlined" iconType="delete" color="error" onClick={() => deleteTx(index)}>
            {''}
          </Button>
          <Text size="md">{tx.description}</Text>
        </Box>
      ))}
    </>
  );
};

const PreSet = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const services = useServices(safe.network);
  return (
    <Dashboard services={services} safe={safe} sdk={sdk}></Dashboard>
  )
}

interface DashboardProps {
  services: any;
  safe: any;
  sdk: any;
}

const Dashboard:React.FC<DashboardProps> = ({services, safe, sdk}) => {
  
  const [toAddressPos, setToAddressPos] = useState('');
  const [contractPos, setContractPos] = useState<ContractInterface | undefined>(undefined);
  const [reviewingPos, setReviewingPos] = useState(false);
  const [selectedMethodIndexPos, setSelectedMethodIndexPos] = useState(0);
  const [inputCachePos, setInputCachePos] = useState<string[]>([]);
  const [addTxErrorPos, setAddTxErrorPos] = useState<string | undefined>();
  const [transactionsPos, setTransactionsPos] = useState<ProposedTransaction[]>([]);

  const [toAddressPlasma, setToAddressPlasma] = useState('');
  const [contractPlasma, setContractPlasma] = useState<ContractInterface | undefined>(undefined);
  const [reviewingPlasma, setReviewingPlasma] = useState(false);
  const [selectedMethodIndexPlasma, setSelectedMethodIndexPlasma] = useState(0);
  const [inputCachePlasma, setInputCachePlasma] = useState<string[]>([]);
  const [addTxErrorPlasma, setAddTxErrorPlasma] = useState<string | undefined>();
  const [transactionsPlasma, setTransactionsPlasma] = useState<ProposedTransaction[]>([]);
  
  const [toAddressL1L2, setToAddressL1L2] = useState('');
  const [contractL1L2, setContractL1L2] = useState<ContractInterface | undefined>(undefined);
  const [reviewingL1L2, setReviewingL1L2] = useState(false);
  const [selectedMethodIndexL1L2, setSelectedMethodIndexL1L2] = useState(0);
  const [inputCacheL1L2, setInputCacheL1L2] = useState<string[]>([]);
  const [addTxErrorL1L2, setAddTxErrorL1L2] = useState<string | undefined>();
  const [transactionsL1L2, setTransactionsL1L2] = useState<ProposedTransaction[]>([]);

  const [toAddressL2L1, setToAddressL2L1] = useState('');
  const [contractL2L1, setContractL2L1] = useState<ContractInterface | undefined>(undefined);
  const [reviewingL2L1, setReviewingL2L1] = useState(false);
  const [selectedMethodIndexL2L1, setSelectedMethodIndexL2L1] = useState(0);
  const [inputCacheL2L1, setInputCacheL2L1] = useState<string[]>([]);
  const [addTxErrorL2L1, setAddTxErrorL2L1] = useState<string | undefined>();
  const [transactionsL2L1, setTransactionsL2L1] = useState<ProposedTransaction[]>([]);

  const handleAddressOrABIPos = async (): Promise<ContractInterface | void> => {
    setContractPos(undefined);
    setToAddressPos(posAddress)

    if (!services.interfaceRepo) {
      return;
    }
    try {
      const contract = await services.interfaceRepo.loadAbi(JSON.stringify(posAbi));
      setContractPos(contract);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddressOrABIPlasma = async (): Promise<ContractInterface | void> => {
    setContractPlasma(undefined);
    setToAddressPlasma(plasmaAddress)

    if (!services.interfaceRepo) {
      return;
    }
    try {
      const contract = await services.interfaceRepo.loadAbi(JSON.stringify(plasmaAbi));
      setContractPlasma(contract);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddressOrABIL1L2 = async (): Promise<ContractInterface | void> => {
    setContractL1L2(undefined);
    setToAddressL1L2(l1l2Address)

    if (!services.interfaceRepo) {
      return;
    }
    try {
      const contract = await services.interfaceRepo.loadAbi(JSON.stringify(l1l2Abi));
      setContractL1L2(contract);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddressOrABIL2L1 = async (): Promise<ContractInterface | void> => {
    setContractL2L1(undefined);
    setToAddressL2L1(l2l1Address)

    if (!services.interfaceRepo) {
      return;
    }
    try {
      const contract = await services.interfaceRepo.loadAbi(JSON.stringify(l2l1Abi));
      setContractL2L1(contract);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMethodPos = useCallback(
    async (methodIndex: number) => {
      if (!contractPos || contractPos.methods.length <= methodIndex) return;
      setSelectedMethodIndexPos(methodIndex);
    },
    [contractPos],
  );

  const handleMethodPlasma = useCallback(
    async (methodIndex: number) => {
      if (!contractPlasma || contractPlasma.methods.length <= methodIndex) return;
      setSelectedMethodIndexPlasma(methodIndex);
    },
    [contractPlasma],
  );

  const handleMethodL1L2 = useCallback(
    async (methodIndex: number) => {
      if (!contractL1L2 || contractL1L2.methods.length <= methodIndex) return;
      setSelectedMethodIndexL1L2(methodIndex);
    },
    [contractL1L2],
  );

  const handleMethodL2L1 = useCallback(
    async (methodIndex: number) => {
      if (!contractL2L1 || contractL2L1.methods.length <= methodIndex) return;
      setSelectedMethodIndexL2L1(methodIndex);
    },
    [contractL2L1],
  );

  const handleInputPos = useCallback(
    async (inputIndex: number, input: string) => {
      inputCachePos[inputIndex] = input;
      setInputCachePos(inputCachePos.slice());
    },
    [inputCachePos],
  );

  const handleInputPlasma = useCallback(
    async (inputIndex: number, input: string) => {
      inputCachePlasma[inputIndex] = input;
      setInputCachePlasma(inputCachePlasma.slice());
    },
    [inputCachePlasma],
  );

  const handleInputL1L2 = useCallback(
    async (inputIndex: number, input: string) => {
      inputCacheL1L2[inputIndex] = input;
      setInputCacheL1L2(inputCacheL1L2.slice());
    },
    [inputCacheL1L2],
  );

  const handleInputL2L1 = useCallback(
    async (inputIndex: number, input: string) => {
      inputCacheL2L1[inputIndex] = input;
      setInputCacheL2L1(inputCacheL2L1.slice());
    },
    [inputCacheL2L1],
  );

  const getContractMethodPos = () => contractPos?.methods[selectedMethodIndexPos];
  const getContractMethodPlasma = () => contractPlasma?.methods[selectedMethodIndexPlasma];
  const getContractMethodL1L2 = () => contractL1L2?.methods[selectedMethodIndexL1L2];
  const getContractMethodL2L1 = () => contractL2L1?.methods[selectedMethodIndexL2L1];

  const isValueInputVisiblePos = () => {
    const method = getContractMethodPos();
    return method?.payable;
  };

  const isValueInputVisiblePlasma = () => {
    const method = getContractMethodPlasma();
    return method?.payable;
  };

  const isValueInputVisibleL1L2 = () => {
    const method = getContractMethodL1L2();
    return method?.payable;
  };

  const isValueInputVisibleL2L1 = () => {
    const method = getContractMethodL2L1();
    return method?.payable;
  };



  const addTransactionPos = useCallback(async () => {
    let description = '';
    let data = '';

    const web3 = services.web3;

    if (!web3) {
      return;
    }

    if (contractPos && contractPos.methods.length > selectedMethodIndexPos) {
      const method = contractPos.methods[selectedMethodIndexPos];
      const cleanInputs = [];

      description = method.name + ' (';
      for (let i = 0; i < method.inputs.length; i++) {
        const cleanValue = inputCachePos[i] || '';
        cleanInputs[i] = cleanValue.charAt(0) === '[' ? JSON.parse(cleanValue.replace(/"/g, '"')) : cleanValue;
        if (i > 0) {
          description += ', ';
        }
        const input = method.inputs[i];
        description += (input.name || input.type) + ': ' + cleanValue;
      }
      description += ')';

      try {
        data = web3.eth.abi.encodeFunctionCall(method as AbiItem, cleanInputs);
      } catch (error) {
        setAddTxErrorPos(error.message);
        return;
      }
    }

    try {
      const cleanTo = web3.utils.toChecksumAddress(toAddressPos);
      const cleanValue = 0;

      if (data.length === 0) {
        data = '0x';
      }

      if (description.length === 0) {
        description = `Transfer ${cleanValue} ETH to ${cleanTo}`;
      }

      transactionsPos.push({
        description,
        raw: { to: cleanTo, value: cleanValue, data },
      });

      setInputCachePos([]);
      setTransactionsPos(transactionsPos);
      setSelectedMethodIndexPos(0);
    } catch (e) {
      console.error(e);
    }
  }, [services, transactionsPos, toAddressPos, contractPos, selectedMethodIndexPos, inputCachePos]);

  const addTransactionPlasma = useCallback(async () => {
    let description = '';
    let data = '';

    const web3 = services.web3;

    if (!web3) {
      return;
    }

    if (contractPlasma && contractPlasma.methods.length > selectedMethodIndexPlasma) {
      const method = contractPlasma.methods[selectedMethodIndexPlasma];
      const cleanInputs = [];

      description = method.name + ' (';
      for (let i = 0; i < method.inputs.length; i++) {
        const cleanValue = inputCachePlasma[i] || '';
        cleanInputs[i] = cleanValue.charAt(0) === '[' ? JSON.parse(cleanValue.replace(/"/g, '"')) : cleanValue;
        if (i > 0) {
          description += ', ';
        }
        const input = method.inputs[i];
        description += (input.name || input.type) + ': ' + cleanValue;
      }
      description += ')';

      try {
        data = web3.eth.abi.encodeFunctionCall(method as AbiItem, cleanInputs);
      } catch (error) {
        setAddTxErrorPlasma(error.message);
        return;
      }
    }

    try {
      const cleanTo = web3.utils.toChecksumAddress(toAddressPlasma);
      const cleanValue = 0;

      if (data.length === 0) {
        data = '0x';
      }

      if (description.length === 0) {
        description = `Transfer ${cleanValue} ETH to ${cleanTo}`;
      }

      transactionsPlasma.push({
        description,
        raw: { to: cleanTo, value: cleanValue, data },
      });

      setInputCachePlasma([]);
      setTransactionsPlasma(transactionsPlasma);
      setSelectedMethodIndexPlasma(0);
    } catch (e) {
      console.error(e);
    }
  }, [services, transactionsPlasma, toAddressPlasma, contractPlasma, selectedMethodIndexPlasma, inputCachePlasma]);

  const addTransactionL1L2 = useCallback(async () => {
    let description = '';
    let data = '';

    const web3 = services.web3;

    if (!web3) {
      return;
    }

    if (contractL1L2 && contractL1L2.methods.length > selectedMethodIndexL1L2) {
      const method = contractL1L2.methods[selectedMethodIndexL1L2];
      const cleanInputs = [];

      description = method.name + ' (';
      for (let i = 0; i < method.inputs.length; i++) {
        const cleanValue = inputCacheL1L2[i] || '';
        cleanInputs[i] = cleanValue.charAt(0) === '[' ? JSON.parse(cleanValue.replace(/"/g, '"')) : cleanValue;
        if (i > 0) {
          description += ', ';
        }
        const input = method.inputs[i];
        description += (input.name || input.type) + ': ' + cleanValue;
      }
      description += ')';

      try {
        data = web3.eth.abi.encodeFunctionCall(method as AbiItem, cleanInputs);
      } catch (error) {
        setAddTxErrorL1L2(error.message);
        return;
      }
    }

    try {
      const cleanTo = web3.utils.toChecksumAddress(toAddressL1L2);
      const cleanValue = 0;

      if (data.length === 0) {
        data = '0x';
      }

      if (description.length === 0) {
        description = `Transfer ${cleanValue} ETH to ${cleanTo}`;
      }

      transactionsL1L2.push({
        description,
        raw: { to: cleanTo, value: cleanValue, data },
      });

      setInputCacheL1L2([]);
      setTransactionsL1L2(transactionsL1L2);
      setSelectedMethodIndexL1L2(0);
    } catch (e) {
      console.error(e);
    }
  }, [services, transactionsL1L2, toAddressL1L2, contractL1L2, selectedMethodIndexL1L2, inputCacheL1L2]);

  const addTransactionL2L1 = useCallback(async () => {
    let description = '';
    let data = '';

    const web3 = services.web3;

    if (!web3) {
      return;
    }

    if (contractL2L1 && contractL2L1.methods.length > selectedMethodIndexL2L1) {
      const method = contractL2L1.methods[selectedMethodIndexL2L1];
      const cleanInputs = [];

      description = method.name + ' (';
      for (let i = 0; i < method.inputs.length; i++) {
        const cleanValue = inputCacheL2L1[i] || '';
        cleanInputs[i] = cleanValue.charAt(0) === '[' ? JSON.parse(cleanValue.replace(/"/g, '"')) : cleanValue;
        if (i > 0) {
          description += ', ';
        }
        const input = method.inputs[i];
        description += (input.name || input.type) + ': ' + cleanValue;
      }
      description += ')';

      try {
        data = web3.eth.abi.encodeFunctionCall(method as AbiItem, cleanInputs);
      } catch (error) {
        setAddTxErrorL2L1(error.message);
        return;
      }
    }

    try {
      const cleanTo = web3.utils.toChecksumAddress(toAddressL2L1);
      const cleanValue = 0;

      if (data.length === 0) {
        data = '0x';
      }

      if (description.length === 0) {
        description = `Transfer ${cleanValue} ETH to ${cleanTo}`;
      }

      transactionsL2L1.push({
        description,
        raw: { to: cleanTo, value: cleanValue, data },
      });

      setInputCacheL2L1([]);
      setTransactionsL2L1(transactionsL2L1);
      setSelectedMethodIndexL2L1(0);
    } catch (e) {
      console.error(e);
    }
  }, [services, transactionsL2L1, toAddressL2L1, contractL2L1, selectedMethodIndexL2L1, inputCacheL2L1]);

  const deleteTransactionPos = useCallback(
    async (inputIndex: number) => {
      const newTxs = transactionsPos.slice();
      newTxs.splice(inputIndex, 1);
      setTransactionsPos(newTxs);
    },
    [transactionsPos],
  );

  const deleteTransactionPlasma = useCallback(
    async (inputIndex: number) => {
      const newTxs = transactionsPlasma.slice();
      newTxs.splice(inputIndex, 1);
      setTransactionsPlasma(newTxs);
    },
    [transactionsPlasma],
  );

  const deleteTransactionL1L2 = useCallback(
    async (inputIndex: number) => {
      const newTxs = transactionsL1L2.slice();
      newTxs.splice(inputIndex, 1);
      setTransactionsL1L2(newTxs);
    },
    [transactionsL1L2],
  );

  const deleteTransactionL2L1 = useCallback(
    async (inputIndex: number) => {
      const newTxs = transactionsL2L1.slice();
      newTxs.splice(inputIndex, 1);
      setTransactionsL2L1(newTxs);
    },
    [transactionsL2L1],
  );

  const sendTransactionsPos = useCallback(async () => {
    if (!transactionsPos.length) {
      return;
    }

    try {
      sdk.txs.send({ txs: transactionsPos.map((d) => d.raw) });
    } catch (e) {
      console.error(e);
    }
  }, [sdk, transactionsPos]);

  const sendTransactionsPlasma = useCallback(async () => {
    if (!transactionsPlasma.length) {
      return;
    }

    try {
      sdk.txs.send({ txs: transactionsPlasma.map((d) => d.raw) });
    } catch (e) {
      console.error(e);
    }
  }, [sdk, transactionsPlasma]);

  const sendTransactionsL1L2 = useCallback(async () => {
    if (!transactionsL1L2.length) {
      return;
    }

    try {
      sdk.txs.send({ txs: transactionsL1L2.map((d) => d.raw) });
    } catch (e) {
      console.error(e);
    }
  }, [sdk, transactionsL1L2]);

  const sendTransactionsL2L1 = useCallback(async () => {
    if (!transactionsL2L1.length) {
      return;
    }

    try {
      sdk.txs.send({ txs: transactionsL2L1.map((d) => d.raw) });
    } catch (e) {
      console.error(e);
    }
  }, [sdk, transactionsL2L1]);

  const handleSubmitPos = () => {
    sendTransactionsPos();
    setTransactionsPos([]);
    setReviewingPos(false);
  };

  const handleSubmitPlasma = () => {
    sendTransactionsPlasma();
    setTransactionsPlasma([]);
    setReviewingPlasma(false);
  };

  const handleSubmitL1L2 = () => {
    sendTransactionsL1L2();
    setTransactionsL1L2([]);
    setReviewingL1L2(false);
  };

  const handleSubmitL2L1 = () => {
    sendTransactionsL2L1();
    setTransactionsL2L1([]);
    setReviewingL2L1(false);
  };

  const handleDismissPos = () => {
    setReviewingPos(false);
  };

  const handleDismissPlasma = () => {
    setReviewingPlasma(false);
  };

  const handleDismissL1L2 = () => {
    setReviewingL1L2(false);
  };

  const handleDismissL2L1 = () => {
    setReviewingL2L1(false);
  };
  

  const getInputInterface = (input: any) => {
    // This code renders a helper for the input text.
    // When the parameter is of Tuple type, it renders an array with the parameters types
    // required to form the Tuple, if not, it renders the parameter type directly.
    if (input.type.startsWith('tuple')) {
      return `tuple(${input.components.map((c: any) => c.internalType).toString()})${
        input.type.endsWith('[]') ? '[]' : ''
      }`;
    } else {
      return input.type;
    }
  };
  
  useEffect(() => {
    handleAddressOrABIPos();
    handleAddressOrABIPlasma();
    handleAddressOrABIL1L2();
    handleAddressOrABIL2L1();
  }, [services])

  return ( services && 
    <WidgetWrapper>
      <StyledTitle size="lg">Token Mapper</StyledTitle>
      <StyledText size="lg">
        This app allows you to Map token on Polygon.
      </StyledText>
      <StyledText size="lg">
        <strong>PoS - [rootChainManagerProxy- 0xA0c68C638235ee32657e8f720a23ceC1bFc77C77]</strong>
        <br/>
        <br/>
        * erc20TokenType = '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b'
        <br/>
        * erc721TokenType = '0x73ad2146b3d3a286642c794379d750360a2d53a3459a11b3e5d6cc900f55f44a'
        <br/>
        * erc1155TokenType ='0x973bb64086f173ec8099b7ed3d43da984f4a332e4417a08bc6a286e6402b0586'
        <br/>
        * mintableErc20TokenType = '0x5ffef61af1560b9aefc0e42aaa0f9464854ab113ab7b8bfab271be94cdb1d053'
        <br/>
        * mintableErc721TokenType = '0xd4392723c111fcb98b073fe55873efb447bcd23cd3e49ec9ea2581930cd01ddc'
        <br/>
        * mintableErc1155TokenType = '0xb62883a28321b19a93c6657bfb8ea4cec51ed05c3ab26ecec680fa0c7efb31b9'
        <br/>
      </StyledText>

      {/* TXs MODAL */}
      {reviewingPos && transactionsPos.length > 0 && (
        <GenericModal
          body={<ModalBody txs={transactionsPos} deleteTx={deleteTransactionPos} />}
          onClose={handleDismissPos}
          title="Send Transactions"
          footer={<ModalFooterConfirmation handleOk={handleSubmitPos} handleCancel={handleDismissPos} />}
        />
      )}

      {/* ABI Loaded */}
      {contractPos && (
        <>
          <Title size="xs">Transaction information for Pos</Title>

          {!contractPos?.methods.length && <Text size="md">Pos Contract ABI doesn't have any public methods.</Text>}

          {/* Input To (destination) */}
          {(isValueInputVisiblePos() || contractPos.methods.length > 0) && (
            <>
              <TextField
                style={{ marginTop: 10 }}
                value={toAddressPos}
                label="To Address"
                // onChange={(e) => setToAddressPos(e.target.value)}
              />
              <br />
            </>
          )}

          {
            <>
              {contractPos.methods.length > 0 && (
                <>
                  <br />
                  <StyledSelect
                    items={contractPos.methods.map((method, index) => ({
                      id: index.toString(),
                      label: method.name,
                    }))}
                    activeItemId={selectedMethodIndexPos.toString()}
                    onItemClick={(id: string) => {
                      setAddTxErrorPos(undefined);
                      handleMethodPos(Number(id));
                    }}
                  />
                </>
              )}

              {getContractMethodPos()?.inputs.map((input, index) => {
                return (
                  <div key={index}>
                    <TextField
                      style={{ marginTop: 10 }}
                      value={inputCachePos[index] || ''}
                      label={`${input.name || ''}(${getInputInterface(input)})`}
                      onChange={(e) => {
                        setAddTxErrorPos(undefined);
                        handleInputPos(index, e.target.value);
                      }}
                    />
                    <br />
                  </div>
                );
              })}

              {addTxErrorPos && (
                <Text size="md" color="error">
                  {addTxErrorPos}
                </Text>
              )}
            </>
          }
          <br />

          {/* Actions */}
          <ButtonContainer>
            {isValueInputVisiblePos() || contractPos.methods.length > 0 ? (
              <Button size="md" color="primary" onClick={() => addTransactionPos()}>
                Add transaction
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              size="md"
              disabled={!transactionsPos.length}
              variant="contained"
              color="primary"
              onClick={() => setReviewingPos(true)}
            >
              {`Send Transactions ${transactionsPos.length ? `(${transactionsPos.length})` : ''}`}
            </Button>
          </ButtonContainer>
        </>
      )}

      <StyledText size="lg">
        <br/>
        <br/>
        <br/>
        <strong>Plasma - [governanceProxy - 0x6e7a5820baD6cebA8Ef5ea69c0C92EbbDAc9CE48]</strong>
        <br/>
        <br/>
        * registery address = '0x33a02E6cC863D393d6Bf231B697b82F6e499cA71'
        <br/>
      </StyledText>


      {/* TXs MODAL */}
      {reviewingPlasma && transactionsPlasma.length > 0 && (
        <GenericModal
          body={<ModalBody txs={transactionsPlasma} deleteTx={deleteTransactionPlasma} />}
          onClose={handleDismissPlasma}
          title="Send Transactions"
          footer={<ModalFooterConfirmation handleOk={handleSubmitPlasma} handleCancel={handleDismissPlasma} />}
        />
      )}

      {/* ABI Loaded */}
      {contractPlasma && (
        <>
          <Title size="xs">Transaction information for Plasma</Title>

          {!contractPlasma?.methods.length && <Text size="md">Plasma Contract ABI doesn't have any public methods.</Text>}

          {/* Input To (destination) */}
          {(isValueInputVisiblePlasma() || contractPlasma.methods.length > 0) && (
            <>
              <TextField
                style={{ marginTop: 10 }}
                value={toAddressPlasma}
                label="To Address"
                onChange={(e) => setToAddressPlasma(e.target.value)}
              />
              <br />
            </>
          )}

          {
            <>
              {contractPlasma.methods.length > 0 && (
                <>
                  <br />
                  <StyledSelect
                    items={contractPlasma.methods.map((method, index) => ({
                      id: index.toString(),
                      label: method.name,
                    }))}
                    activeItemId={selectedMethodIndexPlasma.toString()}
                    onItemClick={(id: string) => {
                      setAddTxErrorPlasma(undefined);
                      handleMethodPlasma(Number(id));
                    }}
                  />
                </>
              )}

              {getContractMethodPlasma()?.inputs.map((input, index) => {
                return (
                  <div key={index}>
                    <TextField
                      style={{ marginTop: 10 }}
                      value={inputCachePlasma[index] || ''}
                      label={`${input.name || ''}(${getInputInterface(input)})`}
                      onChange={(e) => {
                        setAddTxErrorPlasma(undefined);
                        handleInputPlasma(index, e.target.value);
                      }}
                    />
                    <br />
                  </div>
                );
              })}

              {addTxErrorPlasma && (
                <Text size="md" color="error">
                  {addTxErrorPlasma}
                </Text>
              )}
            </>
          }
          <br />

          {/* Actions */}
          <ButtonContainer>
            {isValueInputVisiblePlasma() || contractPlasma.methods.length > 0 ? (
              <Button size="md" color="primary" onClick={() => addTransactionPlasma()}>
                Add transaction
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              size="md"
              disabled={!transactionsPlasma.length}
              variant="contained"
              color="primary"
              onClick={() => setReviewingPlasma(true)}
            >
              {`Send Transactions ${transactionsPlasma.length ? `(${transactionsPlasma.length})` : ''}`}
            </Button>
          </ButtonContainer>
        </>
      )}

      <StyledText size="lg">
        <br/>
        <br/>
        <br/>
        <strong>L1L2 - [stateSender- 0x28e4F3a7f651294B9564800b2D01f35189A5bFbE]</strong>
        <br/>
      </StyledText>


      {/* TXs MODAL */}
      {reviewingL1L2 && transactionsL1L2.length > 0 && (
        <GenericModal
          body={<ModalBody txs={transactionsL1L2} deleteTx={deleteTransactionL1L2} />}
          onClose={handleDismissL1L2}
          title="Send Transactions"
          footer={<ModalFooterConfirmation handleOk={handleSubmitL1L2} handleCancel={handleDismissL1L2} />}
        />
      )}

      {/* ABI Loaded */}
      {contractL1L2 && (
        <>
          <Title size="xs">Transaction information for L1L2</Title>

          {!contractL1L2?.methods.length && <Text size="md">L1L2 Contract ABI doesn't have any public methods.</Text>}

          {/* Input To (destination) */}
          {(isValueInputVisibleL1L2() || contractL1L2.methods.length > 0) && (
            <>
              <TextField
                style={{ marginTop: 10 }}
                value={toAddressL1L2}
                label="To Address"
                onChange={(e) => setToAddressL1L2(e.target.value)}
              />
              <br />
            </>
          )}

          {
            <>
              {contractL1L2.methods.length > 0 && (
                <>
                  <br />
                  <StyledSelect
                    items={contractL1L2.methods.map((method, index) => ({
                      id: index.toString(),
                      label: method.name,
                    }))}
                    activeItemId={selectedMethodIndexL1L2.toString()}
                    onItemClick={(id: string) => {
                      setAddTxErrorL1L2(undefined);
                      handleMethodL1L2(Number(id));
                    }}
                  />
                </>
              )}

              {getContractMethodL1L2()?.inputs.map((input, index) => {
                return (
                  <div key={index}>
                    <TextField
                      style={{ marginTop: 10 }}
                      value={inputCacheL1L2[index] || ''}
                      label={`${input.name || ''}(${getInputInterface(input)})`}
                      onChange={(e) => {
                        setAddTxErrorL1L2(undefined);
                        handleInputL1L2(index, e.target.value);
                      }}
                    />
                    <br />
                  </div>
                );
              })}

              {addTxErrorL1L2 && (
                <Text size="md" color="error">
                  {addTxErrorL1L2}
                </Text>
              )}
            </>
          }
          <br />

          {/* Actions */}
          <ButtonContainer>
            {isValueInputVisibleL1L2() || contractL1L2.methods.length > 0 ? (
              <Button size="md" color="primary" onClick={() => addTransactionL1L2()}>
                Add transaction
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              size="md"
              disabled={!transactionsL1L2.length}
              variant="contained"
              color="primary"
              onClick={() => setReviewingL1L2(true)}
            >
              {`Send Transactions ${transactionsL1L2.length ? `(${transactionsL1L2.length})` : ''}`}
            </Button>
          </ButtonContainer>
        </>
      )}

      <StyledText size="lg">
        <br/>
        <br/>
        <br/>
        <strong>L2L1 - [rootChainManagerProxy- 0xA0c68C638235ee32657e8f720a23ceC1bFc77C77]</strong>
        <br/>
        <br/>
        * tokenType ='0xd2cb9bec761762794c5f1aac30cd08c4b162e1c154230a5c97134039a182238b'
      </StyledText>


      {/* TXs MODAL */}
      {reviewingL2L1 && transactionsL2L1.length > 0 && (
        <GenericModal
          body={<ModalBody txs={transactionsL2L1} deleteTx={deleteTransactionL2L1} />}
          onClose={handleDismissL2L1}
          title="Send Transactions"
          footer={<ModalFooterConfirmation handleOk={handleSubmitL2L1} handleCancel={handleDismissL2L1} />}
        />
      )}

      {/* ABI Loaded */}
      {contractL2L1 && (
        <>
          <Title size="xs">Transaction information for L2L1</Title>

          {!contractL2L1?.methods.length && <Text size="md">L2L1 Contract ABI doesn't have any public methods.</Text>}

          {/* Input To (destination) */}
          {(isValueInputVisibleL2L1() || contractL2L1.methods.length > 0) && (
            <>
              <TextField
                style={{ marginTop: 10 }}
                value={toAddressL2L1}
                label="To Address"
                onChange={(e) => setToAddressL2L1(e.target.value)}
              />
              <br />
            </>
          )}

          {
            <>
              {contractL2L1.methods.length > 0 && (
                <>
                  <br />
                  <StyledSelect
                    items={contractL2L1.methods.map((method, index) => ({
                      id: index.toString(),
                      label: method.name,
                    }))}
                    activeItemId={selectedMethodIndexL2L1.toString()}
                    onItemClick={(id: string) => {
                      setAddTxErrorL2L1(undefined);
                      handleMethodL2L1(Number(id));
                    }}
                  />
                </>
              )}

              {getContractMethodL2L1()?.inputs.map((input, index) => {
                return (
                  <div key={index}>
                    <TextField
                      style={{ marginTop: 10 }}
                      value={inputCacheL2L1[index] || ''}
                      label={`${input.name || ''}(${getInputInterface(input)})`}
                      onChange={(e) => {
                        setAddTxErrorL2L1(undefined);
                        handleInputL2L1(index, e.target.value);
                      }}
                    />
                    <br />
                  </div>
                );
              })}

              {addTxErrorL2L1 && (
                <Text size="md" color="error">
                  {addTxErrorL2L1}
                </Text>
              )}
            </>
          }
          <br />

          {/* Actions */}
          <ButtonContainer>
            {isValueInputVisibleL2L1() || contractL2L1.methods.length > 0 ? (
              <Button size="md" color="primary" onClick={() => addTransactionL2L1()}>
                Add transaction
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              size="md"
              disabled={!transactionsL2L1.length}
              variant="contained"
              color="primary"
              onClick={() => setReviewingL2L1(true)}
            >
              {`Send Transactions ${transactionsL2L1.length ? `(${transactionsL2L1.length})` : ''}`}
            </Button>
          </ButtonContainer>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PreSet;
