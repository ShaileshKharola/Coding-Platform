import { twoSum } from "./two-sum";
import { reverseLinkedList } from "./reverse-linked-list";
import { validParentheses } from "./valid-parentheses";
import { jumpGame } from "./jump-game";
import { search2DMatrix } from "./search-a-2d-matrix";
import { Problem } from "@/utils/types/problem"; // <-- FIXED

interface ProblemMap {
    [key: string]: Problem
}
export const problems: ProblemMap = {
    "two-sum": twoSum,
    "reverse-linked-list": reverseLinkedList,
    "valid-parentheses": validParentheses,
    "jump-game": jumpGame,
    "search-a-2d-matrix": search2DMatrix,
}