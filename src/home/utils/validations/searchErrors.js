import { searchErrors, errorTypes } from '../../constants/searchErrors';

const {
  CILL: { errorID },
  IDOC: { batchID, iDocNumber, cillUniqueIdentifier, reprocessFromCill },
  General: { errorType },
} = searchErrors;

const { CILLType, IDOCType, None } = errorTypes;

export const isCillOrIsIdocError = (allValues) => {
  const formValues = Object.entries(allValues);

  let errorTypeFilter = formValues.find((value) => {
    return value[0] === errorType.label;
  });

  if (errorTypeFilter[1] === 'CILL Error') {
    return CILLType;
  } else if (errorTypeFilter[1] === 'Errored IDoc') {
    return IDOCType;
  }

  let cillValues = formValues.filter((value) => {
    if (value[0] === errorID.label && value[1]) {
      return value;
    }
  });

  let iDocValues = formValues.filter((value) => {
    if (
      (value[0] === batchID.label ||
        value[0] === iDocNumber.label ||
        value[0] === cillUniqueIdentifier.label ||
        value[0] === reprocessFromCill.label) &&
      value[1]
    ) {
      return value;
    }
  });

  if (cillValues.length > 0) {
    return CILLType;
  } else if (iDocValues.length > 0) {
    return IDOCType;
  } else {
    return None;
  }
};
