const isEmpty = (text) => text === '' || null || undefined;

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export default isEmpty;
