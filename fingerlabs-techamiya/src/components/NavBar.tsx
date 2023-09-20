import { styled } from "styled-components";
import TRAITS from "../data/traits";

const NavBar = () => {
  const FILTER = Object.keys(TRAITS);
  return (
    <St.Wrapper>
      {FILTER.map((el, idx) => (
        <div key={idx}>
          <St.FilterItem>
            {el}
            <img src="src/assets/arrow.svg" />
          </St.FilterItem>
          <St.Line />
        </div>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0rem;
    font-size: 1.6rem;
    font-weight: 600;

    & > img {
      width: 1.5rem;
      height: 1.5rem;
    }
  `,
  Line: styled.div`
    width: 100%;
    height: 0.1rem;
    background-color: ${({ theme }) => theme.colors.purple1};
  `,
};
