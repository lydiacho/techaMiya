import { styled } from "styled-components";
import TRAITS from "../data/traits";
import { useState } from "react";
import NavBarFilter from "./NavBarFilter";

interface NavBarProps {
  checkedList: string[][];
  setCheckedList: React.Dispatch<React.SetStateAction<string[][]>>;
}

const NavBar = ({ checkedList, setCheckedList }: NavBarProps) => {
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
            <i>{filterOpen[idx] ? "▲" : "▼"}</i>
          </St.FilterItem>
          <NavBarFilter
            filterOpen={filterOpen[idx]}
            filterIdx={idx}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
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
      font-style: normal;
    }
  `,
  Line: styled.div`
    width: 100%;
    height: 0.05rem;
    margin: 2rem 0rem;
    background-color: ${({ theme }) => theme.colors.purple1};
  `,
};
