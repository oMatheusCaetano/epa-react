import styled, { css } from 'styled-components';
import { FaUser, FaUserCheck, FaTimes } from 'react-icons/fa';
import Image from '~/core/view/components/img/Image';

export const Container = styled.div`
  position: relative;
`;

export const SingleInputContainer = styled.div`
  position: relative;
`;

export const SuggestionList = styled.ul`
  position: absolute;
  z-index: 9999;
  right: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  padding: 5px 0;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  border-radius: ${({ theme }) => theme.radius.default};
`;

export const SuggestionListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SingleInput = styled.input`
  width: 100%;
  padding-left: 30px !important;
`;

const iconCSS = css`
  position: absolute;
  left: 10px;
  top: 27%;
`;

export const SingleInputIcon = styled(FaUser)`
  ${iconCSS}
`;

export const SingleInputIconSelected = styled(FaUserCheck)`
  ${iconCSS}
`;

export const UserImage = styled(Image)`
  ${iconCSS}
  height: 22px;
  width: 22px;
  left: 4px;
  margin-top: 5px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MultipleInputContainer = styled.div`
  position: relative;
`;

export const MultipleInput = styled.input`
  width: 100%;
`;

export const MultipleInputListButton = styled.button`
  position: absolute;
  top: 1px;
  right: 1px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radius.default};
  border: none;
  outline: none;
  padding: 0 5px;
  color: #555;
  transition: .3s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MultipleSelectedList = styled.ul`
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 100%;
  background: white;
  padding: 5px 0;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  border-radius: ${({ theme }) => theme.radius.default};
  max-width: 100px;
  max-width: 300px;
`;

export const MultipleSelectedListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ImageIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 5px;
  height: 22px;
  width: 22px;
`;

export const SelectedUserImage = styled(Image)`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SelectedUserIcon = styled(FaUser)`
  margin-left: 4px;
`;

export const RemoveSelectedUserIconContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 5px;
  height: 22px;
  width: 22px;
  min-height: 22px;
  min-width: 22px;
  max-height: 22px;
  max-width: 22px;
  outline: none;
  border: none;
  background: transparent;
  padding-left: 2px;
  transition: .3s;

  &:hover {
    background: #FF3333;
    border-radius: 50%;
  }
`;
