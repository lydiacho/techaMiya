import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { provider, techaMiyaABI, techaMiyaContractAddress } from "../lib/api";
import { MetaDataType } from "../types/NftType";

const useGetMiya = () => {
  const [data, setData] = useState<MetaDataType[]>([]);
  const miya = new ethers.Contract(
    techaMiyaContractAddress,
    techaMiyaABI,
    provider
  );

  // useEffect(() => {
  //   if (idx !== -1 && inView) {
  //     if (idx === 999) {
  //       miya
  //         .tokenURI(idx)
  //         .then(fetch)
  //         .then((res) => res.json())
  //         .then((json) => JSON.stringify(json, null, 2))
  //         .then((json) => JSON.parse(json))
  //         .then((res) => {
  //           setData((prev) => [...prev, res]);
  //         });
  //       setIdx(-1);
  //     } else {
  //       for (let i = 0; i < 9; i++) {
  //         miya
  //           .tokenURI(idx + i)
  //           .then(fetch)
  //           .then((res) => res.json())
  //           .then((json) => JSON.stringify(json, null, 2))
  //           .then((json) => JSON.parse(json))
  //           .then((res) => {
  //             setData((prev) => [...prev, res]);
  //           });
  //       }
  //       setIdx((prev) => prev + 9);
  //     }
  //   }
  // }, [inView]);

  // 너무 느림. 최적화 필요
  useEffect(() => {
    if (data.length < 100) {
      miya
        .tokenURI(data.length)
        .then(fetch)
        .then((res) => res.json())
        .then((json) => JSON.stringify(json, null, 2))
        .then((json) => JSON.parse(json))
        .then((res) => {
          setData((prev) => [...prev, res]);
        });
    }
  }, [data]);

  return data;
};

export default useGetMiya;
