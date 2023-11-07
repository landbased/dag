export const SPECIALS = [';', '=', '=', '(', ')', '{', '}', ','] as const;

export const KEYWORDS = ['fn', 'if'] as const;

export const OPERATORS = ['+',  '-', '*', '/'] as const;

export const INSTRINSICS = {
    '_PRINT': console.info,
};
