import { useState } from "react";
import { styled } from "styled-components";
import TRAITS from "../data/traits";

const NavBarFilter = ({ filterIdx }: { filterIdx: number }) => {
  // 각 trait을 FILTER[filterIdx]로 접근하기 때문에, key를 제외하고 value들로 이루어진 배열 생성하여 렌더링
  const FILTER = Object.values(TRAITS);
  const [isChecked, setChecked] = useState<boolean[]>(
    Array.from({ length: FILTER[filterIdx].length }, () => false)
  );

  return (
    <St.Wrapper>
      {FILTER[filterIdx].map((el, idx) => (
        <St.TraitItem key={idx}>
          <St.CheckBox
            $isItemChecked={isChecked[idx]}
            onClick={() => {
              const temp = [...isChecked];
              temp[idx] = !temp[idx];
              setChecked(temp);
            }}
          >
            ✓
          </St.CheckBox>
          <span>{el}</span>
        </St.TraitItem>
      ))}
    </St.Wrapper>
  );
};

export default NavBarFilter;

const St = {
  Wrapper: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    margin: 1.5rem 0rem;
  `,
  TraitItem: styled.li`
    display: flex;

    & > span {
      font-size: 1.6rem;
      font-weight: 300;
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  CheckBox: styled.div<{ $isItemChecked: boolean }>`
    text-align: center;

    margin-right: 1.5rem;
    width: 1.8rem;
    height: 1.8rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.purple1};
    border-radius: 0.3rem;
    background-color: ${({ $isItemChecked, theme }) =>
      $isItemChecked ? theme.colors.pink : theme.colors.bg};

    font-size: 1.3rem;
    color: ${({ $isItemChecked, theme }) =>
      $isItemChecked ? "white" : theme.colors.bg};
    cursor: pointer;
  `,
};
