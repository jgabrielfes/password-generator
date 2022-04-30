export const changeLength = (value) => ({ type: 'CHANGE_LENGTH', value });

export const changeInclude = (include, value) => ({
  type: 'CHANGE_INCLUDE',
  include,
  value,
});
