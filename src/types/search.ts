import React from "react";

export type QueryT = {
    value : string;
    tag : string
}

export type SearchResutListT  = {
    query : QueryT;
    setQuery :  React.Dispatch<React.SetStateAction<QueryT>>;
    resultList : [] | null
}