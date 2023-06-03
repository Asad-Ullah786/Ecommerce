import { useState,useEffect } from "react";

export default function useCategory () {

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
          await fetch(`${process.env.REACT_APP_API}/api/v1/category/categories`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // "authorization": `bearer ${auth?.token}`
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((x) => {
              if (x?.success) {
                setCategories(x?.categories);
                // toast.success(`${x.message}`);
                // console.log(x, "response");
              } else {
                console.log();
              }
            });
        } catch (error) {
          console.log(error.message);
        }
      };

      useEffect(() => {
        getCategories();
      },[])

      return categories;

}