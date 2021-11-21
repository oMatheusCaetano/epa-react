/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useRef, useState, useEffect } from 'react';
import { FaAngleDown, FaTimes, FaCheck } from 'react-icons/fa';
import GetClientes from '~/features/Users/data/datasources/get-clientes';
import { Cliente } from '~/features/Users/domain/models';

import * as C from '~/core/view/components';
import * as S from './styles';

export interface ClienteInputProps {
  onlyActives?: boolean;
  multiple?: boolean;
  value?: number | string;
  label?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  onChange?: (cliente?: Cliente | Cliente[]) => void;
}

const ClienteInput: React.FC<ClienteInputProps> = ({
  onlyActives = true,
  multiple = false,
  value,
  label,
  placeholder = 'Mínimo de 3 caracteres..',
  error,
  className,
  onChange,
}) => {
  const minLength = 3;
  const listRef = useRef<HTMLInputElement>(null);
  const [showList, setShowList] = useState(false);
  const [showSelectedList, setShowSelectedList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hiddenInputValue, setHiddenInputValue] = useState(value);
  const [selectedCliente, setSelectedCliente] = useState(
    multiple ? [] as Cliente[] : {} as Cliente,
  );

  useEffect(() => { getInitialValue(); }, []);
  useEffect(updateVisibleSelection, [selectedCliente]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleEscKeyPressed, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscKeyPressed, true);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = ({ target }: any) => {
    if (listRef.current && !listRef.current.contains(target)) {
      setShowList(false);
      setShowSelectedList(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEscKeyPressed = ({ key }: any) => {
    if (key === 'Escape') {
      setShowList(false);
      setShowSelectedList(false);
    }
  };

  async function getInitialValue() {
    if (!value) return;

    setIsLoading(true);
    new GetClientes().exec({
      orderBy: ['codigo', 'nome'],
      onlyColumns: ['codigo', 'nome', 'foto'],
      filters: [{ field: 'codigo', value }],
      onFinally: () => setIsLoading(false),
      onSuccess: (clientes) => {
        const list = clientes as Cliente[];
        if (list.length === 0) return;
        setSelectedCliente(multiple ? list : list[0]);
      },
    });
  }

  function updateVisibleSelection() {
    if (multiple) {
      return;
    }

    const data = selectedCliente as Cliente;
    setInputValue(data.nome ?? '');
  }

  async function handleSearch(value: string) {
    setInputValue(value);
    if (value.length === 0 && !multiple) {
      setSelectedCliente({} as Cliente);
      setHiddenInputValue('');
      if (onChange) onChange(undefined);
      return;
    }

    if (value.length < minLength) return;
    setShowList(true);
    setIsLoading(true);
    setClientes([]);
    makeApiCall(value);
  }

  async function makeApiCall(searchValue: string) {
    setIsLoading(true);
    new GetClientes().exec({
      hasText: searchValue,
      orderBy: ['codigo', 'nome'],
      onlyColumns: ['codigo', 'nome', 'foto'],
      filters: [{ field: 'ativo', value: onlyActives ? 1 : 0 }],
      onSuccess: (clientes) => {
        const list = clientes as Cliente[];
        setClientes(list);
        setShowSelectedList(false);
        setShowList(true);
      },
      onFinally: () => setIsLoading(false),
    });
  }

  function getSelectedClienteValue() {
    if (multiple) {
      const list = selectedCliente as Cliente[];
      const ids = list.map((cliente) => cliente.codigo);
      return ids.join(',');
    }

    const data = selectedCliente as Cliente;
    return data.codigo ?? '';
  }

  function getSingleUserImage() {
    if (!getSelectedClienteValue()) {
      return <S.SingleInputIcon />;
    }

    const data = selectedCliente as Cliente;
    return data?.foto
      ? <S.UserImage src={`gedoc/${data.foto}`} />
      : <S.SingleInputIconSelected />;
  }

  function getSelectedClientesCount() {
    if (!multiple) return 0;

    const list = selectedCliente as Cliente[];
    return list.length;
  }

  function removeSelectedCliente(cliente: Cliente) {
    const list = selectedCliente as Cliente[];
    const newList = list.filter((item) => item.codigo !== cliente.codigo);
    setSelectedCliente(newList);
    setHiddenInputValue(newList.map((cliente) => cliente.codigo).join(','));
    if (onChange) onChange(newList);
  }

  function getSelectedClientesCountList() {
    const list = selectedCliente as Cliente[];
    return (
      <S.MultipleSelectedList hidden={!showSelectedList}>
        {
          list.map((cliente) => (
            <S.MultipleSelectedListItem
              key={cliente.codigo}
            >
              <S.RemoveSelectedUserIconContainer type="button" onClick={() => removeSelectedCliente(cliente)}>
                <FaTimes fill="#666" />
              </S.RemoveSelectedUserIconContainer>
              {cliente?.foto
                ? (
                  <S.ImageIconContainer>
                    <S.SelectedUserImage src={`gedoc/${cliente.foto}`} />
                  </S.ImageIconContainer>
                )

                : (
                  <S.ImageIconContainer>
                    <S.SelectedUserIcon />
                  </S.ImageIconContainer>
                )}
              <span>{cliente.codigo} - {cliente.nome}</span>
            </S.MultipleSelectedListItem>
          ))
        }
      </S.MultipleSelectedList>
    );
  }

  function shouldShowSelectedIcon(cliente: Cliente) {
    if (multiple) {
      const list = selectedCliente as Cliente[];
      for (const item of list) {
        if (item.codigo === cliente.codigo) {
          return true;
        }
      }

      return false;
    }

    const item = selectedCliente as Cliente;
    return cliente.codigo === item.codigo;
  }

  function handleClienteSelection(cliente: Cliente) {
    if (multiple) {
      const list = selectedCliente as Cliente[];
      const item = list.find((item) => item.codigo === cliente.codigo);
      if (item) {
        removeSelectedCliente(cliente);
        return;
      }

      const newList = [...list, cliente];
      setSelectedCliente(newList);
      setHiddenInputValue(newList.map((cliente) => cliente.codigo).join(','));
      if (onChange) onChange(newList);
      return;
    }

    const item = selectedCliente as Cliente;
    setHiddenInputValue(cliente.codigo);
    if (onChange) onChange(cliente);
    item.codigo === cliente.codigo
      ? setSelectedCliente({} as Cliente)
      : setSelectedCliente(cliente);
    setShowList(false);
  }

  function onInputClick() {
    if (clientes.length) {
      setShowSelectedList(false);
      setShowList(true);
    }
  }

  function onSelectedButtonClick() {
    setShowSelectedList(!showSelectedList);
    setShowList(false);
  }

  return (
    <S.Container ref={listRef} className={className}>
      <div>
        <input value={hiddenInputValue ?? ''} readOnly hidden />
        <C.Label label={label} />
        {
          multiple
            ? (
              <S.MultipleInputContainer>
                <S.MultipleInputListButton type="button" onClick={onSelectedButtonClick}>
                  {getSelectedClientesCount()} selecionado(s)
                  <FaAngleDown style={{ marginLeft: '3px' }} />
                </S.MultipleInputListButton>

                {getSelectedClientesCountList()}

                <S.MultipleInput
                  value={inputValue}
                  className="form-input-style"
                  placeholder={placeholder}
                  onClick={onInputClick}
                  onChange={({ target }) => handleSearch(target.value)}
                />
              </S.MultipleInputContainer>
            )
            : (
              <S.SingleInputContainer>
                {getSingleUserImage()}
                <S.SingleInput
                  type="search"
                  value={inputValue}
                  className="form-input-style"
                  placeholder={placeholder}
                  onClick={onInputClick}
                  onChange={({ target }) => handleSearch(target.value)}
                />
              </S.SingleInputContainer>
            )
        }
        <C.SmallText error={error} />
      </div>

      <S.SuggestionList hidden={!showList}>
        <li className="text-center" hidden={!isLoading}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </li>

        <li className="text-center" hidden={isLoading || !!clientes.length}>
          <span>Nenhum resultado</span>
        </li>

        {clientes.map((cliente) => (
          <S.SuggestionListItem
            key={cliente.codigo}
            onClick={() => handleClienteSelection(cliente)}
          >
            {cliente?.foto
              ? (
                <S.ImageIconContainer>
                  <S.SelectedUserImage src={`gedoc/${cliente.foto}`} />
                </S.ImageIconContainer>
              )

              : (
                <S.ImageIconContainer>
                  <S.SelectedUserIcon />
                </S.ImageIconContainer>
              )}
            <span>{cliente.codigo} - {cliente.nome}</span>
            <div
              style={{ marginLeft: 'auto' }}
              hidden={!shouldShowSelectedIcon(cliente)}
            >
              <FaCheck />
            </div>
          </S.SuggestionListItem>
        ))}
      </S.SuggestionList>
    </S.Container>
  );
};

export default ClienteInput;
