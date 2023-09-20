import { styled } from "styled-components";
import TRAITS from "../data/traits";
import { useState } from "react";

const NavBar = () => {
  const FILTER = Object.keys(TRAITS);
  const [filterOpen, setFilterOpen] = useState<boolean[]>(
    Array.from({ length: 13 }, () => false)
  );

  return (
    <St.Wrapper>
      {FILTER.map((el, idx) => (
        <div key={idx}>
          <St.FilterItem
            onClick={() => {
              // 배열의 특정 요소 update
              const temp = [...filterOpen];
              temp[idx] = !temp[idx];
              setFilterOpen(temp);
            }}
          >
            {el}
            <i>{filterOpen[idx] ? "▼" : "▲"}</i>
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
    font-size: 1.6rem;
    font-weight: 600;
    cursor: pointer;

    & > i {
      font-size: 1.6rem;
    }
  `,
  Line: styled.div`
    width: 100%;
    height: 0.1rem;
    margin: 2rem 0rem;
    background-color: ${({ theme }) => theme.colors.purple1};
  `,
};
