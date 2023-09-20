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

  useEffect(() => {
    if (data.length < 1000) {
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
