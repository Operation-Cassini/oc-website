/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getSaturnTestData } from "../graphql/queries";
import { updateSaturnTestData } from "../graphql/mutations";
const client = generateClient();
export default function SaturnTestDataUpdateForm(props) {
  const {
    id: idProp,
    saturnTestData: saturnTestDataModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    testScore: "",
  };
  const [testScore, setTestScore] = React.useState(initialValues.testScore);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = saturnTestDataRecord
      ? { ...initialValues, ...saturnTestDataRecord }
      : initialValues;
    setTestScore(cleanValues.testScore);
    setErrors({});
  };
  const [saturnTestDataRecord, setSaturnTestDataRecord] = React.useState(
    saturnTestDataModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSaturnTestData.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSaturnTestData
        : saturnTestDataModelProp;
      setSaturnTestDataRecord(record);
    };
    queryData();
  }, [idProp, saturnTestDataModelProp]);
  React.useEffect(resetStateValues, [saturnTestDataRecord]);
  const validations = {
    testScore: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          testScore: testScore ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateSaturnTestData.replaceAll("__typename", ""),
            variables: {
              input: {
                id: saturnTestDataRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SaturnTestDataUpdateForm")}
      {...rest}
    >
      <TextField
        label="Test score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={testScore}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              testScore: value,
            };
            const result = onChange(modelFields);
            value = result?.testScore ?? value;
          }
          if (errors.testScore?.hasError) {
            runValidationTasks("testScore", value);
          }
          setTestScore(value);
        }}
        onBlur={() => runValidationTasks("testScore", testScore)}
        errorMessage={errors.testScore?.errorMessage}
        hasError={errors.testScore?.hasError}
        {...getOverrideProps(overrides, "testScore")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || saturnTestDataModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || saturnTestDataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
