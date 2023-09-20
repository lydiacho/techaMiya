import { styled } from "styled-components";
import TRAITS from "../data/traits";

const NavBar = () => {
  const FILTER = Object.keys(TRAITS);
  return (
    <St.Wrapper>
      {FILTER.map((el, idx) => (
        <St.FilterItem key={idx}>
          <p>{el}</p>
          <St.Line />
        </St.FilterItem>
      ))}
    </St.Wrapper>
  );
};

export default NavBar;

const St = {
  Wrapper: styled.ul`
    width: 26.4rem;
  `,
  FilterItem: styled.li`
    & > p {
      padding: 2rem 0rem;
      font-size: 1.6rem;
      font-weight: 600;
    }
  `,
  Line: styled.div`
    width: 100%;
    height: 0.1rem;
    background-color: ${({ theme }) => theme.colors.purple1};
  `,
};
