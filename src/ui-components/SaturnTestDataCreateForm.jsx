/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createSaturnTestData } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SaturnTestDataCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    totalPoints: "",
    totalTime: "",
    executiveMiniTrailsB: [],
    executiveStroop: [],
    math: [],
    meanPredictiveZScores: [],
    memoryFiveWords: [],
    memoryIncidental: [],
    motorSpeed: [],
    orientation: [],
    readingSpeed: [],
    simpleAttention: [],
    visuospatialImageCombos: [],
    visuospatialMiniTrailsA: [],
  };
  const [totalPoints, setTotalPoints] = React.useState(
    initialValues.totalPoints
  );
  const [totalTime, setTotalTime] = React.useState(initialValues.totalTime);
  const [executiveMiniTrailsB, setExecutiveMiniTrailsB] = React.useState(
    initialValues.executiveMiniTrailsB
  );
  const [executiveStroop, setExecutiveStroop] = React.useState(
    initialValues.executiveStroop
  );
  const [math, setMath] = React.useState(initialValues.math);
  const [meanPredictiveZScores, setMeanPredictiveZScores] = React.useState(
    initialValues.meanPredictiveZScores
  );
  const [memoryFiveWords, setMemoryFiveWords] = React.useState(
    initialValues.memoryFiveWords
  );
  const [memoryIncidental, setMemoryIncidental] = React.useState(
    initialValues.memoryIncidental
  );
  const [motorSpeed, setMotorSpeed] = React.useState(initialValues.motorSpeed);
  const [orientation, setOrientation] = React.useState(
    initialValues.orientation
  );
  const [readingSpeed, setReadingSpeed] = React.useState(
    initialValues.readingSpeed
  );
  const [simpleAttention, setSimpleAttention] = React.useState(
    initialValues.simpleAttention
  );
  const [visuospatialImageCombos, setVisuospatialImageCombos] = React.useState(
    initialValues.visuospatialImageCombos
  );
  const [visuospatialMiniTrailsA, setVisuospatialMiniTrailsA] = React.useState(
    initialValues.visuospatialMiniTrailsA
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTotalPoints(initialValues.totalPoints);
    setTotalTime(initialValues.totalTime);
    setExecutiveMiniTrailsB(initialValues.executiveMiniTrailsB);
    setCurrentExecutiveMiniTrailsBValue("");
    setExecutiveStroop(initialValues.executiveStroop);
    setCurrentExecutiveStroopValue("");
    setMath(initialValues.math);
    setCurrentMathValue("");
    setMeanPredictiveZScores(initialValues.meanPredictiveZScores);
    setCurrentMeanPredictiveZScoresValue("");
    setMemoryFiveWords(initialValues.memoryFiveWords);
    setCurrentMemoryFiveWordsValue("");
    setMemoryIncidental(initialValues.memoryIncidental);
    setCurrentMemoryIncidentalValue("");
    setMotorSpeed(initialValues.motorSpeed);
    setCurrentMotorSpeedValue("");
    setOrientation(initialValues.orientation);
    setCurrentOrientationValue("");
    setReadingSpeed(initialValues.readingSpeed);
    setCurrentReadingSpeedValue("");
    setSimpleAttention(initialValues.simpleAttention);
    setCurrentSimpleAttentionValue("");
    setVisuospatialImageCombos(initialValues.visuospatialImageCombos);
    setCurrentVisuospatialImageCombosValue("");
    setVisuospatialMiniTrailsA(initialValues.visuospatialMiniTrailsA);
    setCurrentVisuospatialMiniTrailsAValue("");
    setErrors({});
  };
  const [
    currentExecutiveMiniTrailsBValue,
    setCurrentExecutiveMiniTrailsBValue,
  ] = React.useState("");
  const executiveMiniTrailsBRef = React.createRef();
  const [currentExecutiveStroopValue, setCurrentExecutiveStroopValue] =
    React.useState("");
  const executiveStroopRef = React.createRef();
  const [currentMathValue, setCurrentMathValue] = React.useState("");
  const mathRef = React.createRef();
  const [
    currentMeanPredictiveZScoresValue,
    setCurrentMeanPredictiveZScoresValue,
  ] = React.useState("");
  const meanPredictiveZScoresRef = React.createRef();
  const [currentMemoryFiveWordsValue, setCurrentMemoryFiveWordsValue] =
    React.useState("");
  const memoryFiveWordsRef = React.createRef();
  const [currentMemoryIncidentalValue, setCurrentMemoryIncidentalValue] =
    React.useState("");
  const memoryIncidentalRef = React.createRef();
  const [currentMotorSpeedValue, setCurrentMotorSpeedValue] =
    React.useState("");
  const motorSpeedRef = React.createRef();
  const [currentOrientationValue, setCurrentOrientationValue] =
    React.useState("");
  const orientationRef = React.createRef();
  const [currentReadingSpeedValue, setCurrentReadingSpeedValue] =
    React.useState("");
  const readingSpeedRef = React.createRef();
  const [currentSimpleAttentionValue, setCurrentSimpleAttentionValue] =
    React.useState("");
  const simpleAttentionRef = React.createRef();
  const [
    currentVisuospatialImageCombosValue,
    setCurrentVisuospatialImageCombosValue,
  ] = React.useState("");
  const visuospatialImageCombosRef = React.createRef();
  const [
    currentVisuospatialMiniTrailsAValue,
    setCurrentVisuospatialMiniTrailsAValue,
  ] = React.useState("");
  const visuospatialMiniTrailsARef = React.createRef();
  const validations = {
    totalPoints: [],
    totalTime: [],
    executiveMiniTrailsB: [],
    executiveStroop: [],
    math: [],
    meanPredictiveZScores: [],
    memoryFiveWords: [],
    memoryIncidental: [],
    motorSpeed: [],
    orientation: [],
    readingSpeed: [],
    simpleAttention: [],
    visuospatialImageCombos: [],
    visuospatialMiniTrailsA: [],
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
          totalPoints,
          totalTime,
          executiveMiniTrailsB,
          executiveStroop,
          math,
          meanPredictiveZScores,
          memoryFiveWords,
          memoryIncidental,
          motorSpeed,
          orientation,
          readingSpeed,
          simpleAttention,
          visuospatialImageCombos,
          visuospatialMiniTrailsA,
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
            query: createSaturnTestData.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SaturnTestDataCreateForm")}
      {...rest}
    >
      <TextField
        label="Total points"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalPoints}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              totalPoints: value,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            value = result?.totalPoints ?? value;
          }
          if (errors.totalPoints?.hasError) {
            runValidationTasks("totalPoints", value);
          }
          setTotalPoints(value);
        }}
        onBlur={() => runValidationTasks("totalPoints", totalPoints)}
        errorMessage={errors.totalPoints?.errorMessage}
        hasError={errors.totalPoints?.hasError}
        {...getOverrideProps(overrides, "totalPoints")}
      ></TextField>
      <TextField
        label="Total time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalTime}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime: value,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            value = result?.totalTime ?? value;
          }
          if (errors.totalTime?.hasError) {
            runValidationTasks("totalTime", value);
          }
          setTotalTime(value);
        }}
        onBlur={() => runValidationTasks("totalTime", totalTime)}
        errorMessage={errors.totalTime?.errorMessage}
        hasError={errors.totalTime?.hasError}
        {...getOverrideProps(overrides, "totalTime")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB: values,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.executiveMiniTrailsB ?? values;
          }
          setExecutiveMiniTrailsB(values);
          setCurrentExecutiveMiniTrailsBValue("");
        }}
        currentFieldValue={currentExecutiveMiniTrailsBValue}
        label={"Executive mini trails b"}
        items={executiveMiniTrailsB}
        hasError={errors?.executiveMiniTrailsB?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "executiveMiniTrailsB",
            currentExecutiveMiniTrailsBValue
          )
        }
        errorMessage={errors?.executiveMiniTrailsB?.errorMessage}
        setFieldValue={setCurrentExecutiveMiniTrailsBValue}
        inputFieldRef={executiveMiniTrailsBRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Executive mini trails b"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentExecutiveMiniTrailsBValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.executiveMiniTrailsB?.hasError) {
              runValidationTasks("executiveMiniTrailsB", value);
            }
            setCurrentExecutiveMiniTrailsBValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "executiveMiniTrailsB",
              currentExecutiveMiniTrailsBValue
            )
          }
          errorMessage={errors.executiveMiniTrailsB?.errorMessage}
          hasError={errors.executiveMiniTrailsB?.hasError}
          ref={executiveMiniTrailsBRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "executiveMiniTrailsB")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop: values,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.executiveStroop ?? values;
          }
          setExecutiveStroop(values);
          setCurrentExecutiveStroopValue("");
        }}
        currentFieldValue={currentExecutiveStroopValue}
        label={"Executive stroop"}
        items={executiveStroop}
        hasError={errors?.executiveStroop?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "executiveStroop",
            currentExecutiveStroopValue
          )
        }
        errorMessage={errors?.executiveStroop?.errorMessage}
        setFieldValue={setCurrentExecutiveStroopValue}
        inputFieldRef={executiveStroopRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Executive stroop"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentExecutiveStroopValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.executiveStroop?.hasError) {
              runValidationTasks("executiveStroop", value);
            }
            setCurrentExecutiveStroopValue(value);
          }}
          onBlur={() =>
            runValidationTasks("executiveStroop", currentExecutiveStroopValue)
          }
          errorMessage={errors.executiveStroop?.errorMessage}
          hasError={errors.executiveStroop?.hasError}
          ref={executiveStroopRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "executiveStroop")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math: values,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.math ?? values;
          }
          setMath(values);
          setCurrentMathValue("");
        }}
        currentFieldValue={currentMathValue}
        label={"Math"}
        items={math}
        hasError={errors?.math?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("math", currentMathValue)
        }
        errorMessage={errors?.math?.errorMessage}
        setFieldValue={setCurrentMathValue}
        inputFieldRef={mathRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Math"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentMathValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.math?.hasError) {
              runValidationTasks("math", value);
            }
            setCurrentMathValue(value);
          }}
          onBlur={() => runValidationTasks("math", currentMathValue)}
          errorMessage={errors.math?.errorMessage}
          hasError={errors.math?.hasError}
          ref={mathRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "math")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores: values,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.meanPredictiveZScores ?? values;
          }
          setMeanPredictiveZScores(values);
          setCurrentMeanPredictiveZScoresValue("");
        }}
        currentFieldValue={currentMeanPredictiveZScoresValue}
        label={"Mean predictive z scores"}
        items={meanPredictiveZScores}
        hasError={errors?.meanPredictiveZScores?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "meanPredictiveZScores",
            currentMeanPredictiveZScoresValue
          )
        }
        errorMessage={errors?.meanPredictiveZScores?.errorMessage}
        setFieldValue={setCurrentMeanPredictiveZScoresValue}
        inputFieldRef={meanPredictiveZScoresRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mean predictive z scores"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentMeanPredictiveZScoresValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.meanPredictiveZScores?.hasError) {
              runValidationTasks("meanPredictiveZScores", value);
            }
            setCurrentMeanPredictiveZScoresValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "meanPredictiveZScores",
              currentMeanPredictiveZScoresValue
            )
          }
          errorMessage={errors.meanPredictiveZScores?.errorMessage}
          hasError={errors.meanPredictiveZScores?.hasError}
          ref={meanPredictiveZScoresRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "meanPredictiveZScores")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords: values,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.memoryFiveWords ?? values;
          }
          setMemoryFiveWords(values);
          setCurrentMemoryFiveWordsValue("");
        }}
        currentFieldValue={currentMemoryFiveWordsValue}
        label={"Memory five words"}
        items={memoryFiveWords}
        hasError={errors?.memoryFiveWords?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "memoryFiveWords",
            currentMemoryFiveWordsValue
          )
        }
        errorMessage={errors?.memoryFiveWords?.errorMessage}
        setFieldValue={setCurrentMemoryFiveWordsValue}
        inputFieldRef={memoryFiveWordsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Memory five words"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentMemoryFiveWordsValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.memoryFiveWords?.hasError) {
              runValidationTasks("memoryFiveWords", value);
            }
            setCurrentMemoryFiveWordsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("memoryFiveWords", currentMemoryFiveWordsValue)
          }
          errorMessage={errors.memoryFiveWords?.errorMessage}
          hasError={errors.memoryFiveWords?.hasError}
          ref={memoryFiveWordsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "memoryFiveWords")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental: values,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.memoryIncidental ?? values;
          }
          setMemoryIncidental(values);
          setCurrentMemoryIncidentalValue("");
        }}
        currentFieldValue={currentMemoryIncidentalValue}
        label={"Memory incidental"}
        items={memoryIncidental}
        hasError={errors?.memoryIncidental?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "memoryIncidental",
            currentMemoryIncidentalValue
          )
        }
        errorMessage={errors?.memoryIncidental?.errorMessage}
        setFieldValue={setCurrentMemoryIncidentalValue}
        inputFieldRef={memoryIncidentalRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Memory incidental"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentMemoryIncidentalValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.memoryIncidental?.hasError) {
              runValidationTasks("memoryIncidental", value);
            }
            setCurrentMemoryIncidentalValue(value);
          }}
          onBlur={() =>
            runValidationTasks("memoryIncidental", currentMemoryIncidentalValue)
          }
          errorMessage={errors.memoryIncidental?.errorMessage}
          hasError={errors.memoryIncidental?.hasError}
          ref={memoryIncidentalRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "memoryIncidental")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed: values,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.motorSpeed ?? values;
          }
          setMotorSpeed(values);
          setCurrentMotorSpeedValue("");
        }}
        currentFieldValue={currentMotorSpeedValue}
        label={"Motor speed"}
        items={motorSpeed}
        hasError={errors?.motorSpeed?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("motorSpeed", currentMotorSpeedValue)
        }
        errorMessage={errors?.motorSpeed?.errorMessage}
        setFieldValue={setCurrentMotorSpeedValue}
        inputFieldRef={motorSpeedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Motor speed"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentMotorSpeedValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.motorSpeed?.hasError) {
              runValidationTasks("motorSpeed", value);
            }
            setCurrentMotorSpeedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("motorSpeed", currentMotorSpeedValue)
          }
          errorMessage={errors.motorSpeed?.errorMessage}
          hasError={errors.motorSpeed?.hasError}
          ref={motorSpeedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "motorSpeed")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation: values,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.orientation ?? values;
          }
          setOrientation(values);
          setCurrentOrientationValue("");
        }}
        currentFieldValue={currentOrientationValue}
        label={"Orientation"}
        items={orientation}
        hasError={errors?.orientation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("orientation", currentOrientationValue)
        }
        errorMessage={errors?.orientation?.errorMessage}
        setFieldValue={setCurrentOrientationValue}
        inputFieldRef={orientationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Orientation"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentOrientationValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.orientation?.hasError) {
              runValidationTasks("orientation", value);
            }
            setCurrentOrientationValue(value);
          }}
          onBlur={() =>
            runValidationTasks("orientation", currentOrientationValue)
          }
          errorMessage={errors.orientation?.errorMessage}
          hasError={errors.orientation?.hasError}
          ref={orientationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "orientation")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed: values,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.readingSpeed ?? values;
          }
          setReadingSpeed(values);
          setCurrentReadingSpeedValue("");
        }}
        currentFieldValue={currentReadingSpeedValue}
        label={"Reading speed"}
        items={readingSpeed}
        hasError={errors?.readingSpeed?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("readingSpeed", currentReadingSpeedValue)
        }
        errorMessage={errors?.readingSpeed?.errorMessage}
        setFieldValue={setCurrentReadingSpeedValue}
        inputFieldRef={readingSpeedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Reading speed"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentReadingSpeedValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.readingSpeed?.hasError) {
              runValidationTasks("readingSpeed", value);
            }
            setCurrentReadingSpeedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("readingSpeed", currentReadingSpeedValue)
          }
          errorMessage={errors.readingSpeed?.errorMessage}
          hasError={errors.readingSpeed?.hasError}
          ref={readingSpeedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "readingSpeed")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention: values,
              visuospatialImageCombos,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.simpleAttention ?? values;
          }
          setSimpleAttention(values);
          setCurrentSimpleAttentionValue("");
        }}
        currentFieldValue={currentSimpleAttentionValue}
        label={"Simple attention"}
        items={simpleAttention}
        hasError={errors?.simpleAttention?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "simpleAttention",
            currentSimpleAttentionValue
          )
        }
        errorMessage={errors?.simpleAttention?.errorMessage}
        setFieldValue={setCurrentSimpleAttentionValue}
        inputFieldRef={simpleAttentionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Simple attention"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentSimpleAttentionValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.simpleAttention?.hasError) {
              runValidationTasks("simpleAttention", value);
            }
            setCurrentSimpleAttentionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("simpleAttention", currentSimpleAttentionValue)
          }
          errorMessage={errors.simpleAttention?.errorMessage}
          hasError={errors.simpleAttention?.hasError}
          ref={simpleAttentionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "simpleAttention")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos: values,
              visuospatialMiniTrailsA,
            };
            const result = onChange(modelFields);
            values = result?.visuospatialImageCombos ?? values;
          }
          setVisuospatialImageCombos(values);
          setCurrentVisuospatialImageCombosValue("");
        }}
        currentFieldValue={currentVisuospatialImageCombosValue}
        label={"Visuospatial image combos"}
        items={visuospatialImageCombos}
        hasError={errors?.visuospatialImageCombos?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "visuospatialImageCombos",
            currentVisuospatialImageCombosValue
          )
        }
        errorMessage={errors?.visuospatialImageCombos?.errorMessage}
        setFieldValue={setCurrentVisuospatialImageCombosValue}
        inputFieldRef={visuospatialImageCombosRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Visuospatial image combos"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentVisuospatialImageCombosValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.visuospatialImageCombos?.hasError) {
              runValidationTasks("visuospatialImageCombos", value);
            }
            setCurrentVisuospatialImageCombosValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "visuospatialImageCombos",
              currentVisuospatialImageCombosValue
            )
          }
          errorMessage={errors.visuospatialImageCombos?.errorMessage}
          hasError={errors.visuospatialImageCombos?.hasError}
          ref={visuospatialImageCombosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "visuospatialImageCombos")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              totalPoints,
              totalTime,
              executiveMiniTrailsB,
              executiveStroop,
              math,
              meanPredictiveZScores,
              memoryFiveWords,
              memoryIncidental,
              motorSpeed,
              orientation,
              readingSpeed,
              simpleAttention,
              visuospatialImageCombos,
              visuospatialMiniTrailsA: values,
            };
            const result = onChange(modelFields);
            values = result?.visuospatialMiniTrailsA ?? values;
          }
          setVisuospatialMiniTrailsA(values);
          setCurrentVisuospatialMiniTrailsAValue("");
        }}
        currentFieldValue={currentVisuospatialMiniTrailsAValue}
        label={"Visuospatial mini trails a"}
        items={visuospatialMiniTrailsA}
        hasError={errors?.visuospatialMiniTrailsA?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "visuospatialMiniTrailsA",
            currentVisuospatialMiniTrailsAValue
          )
        }
        errorMessage={errors?.visuospatialMiniTrailsA?.errorMessage}
        setFieldValue={setCurrentVisuospatialMiniTrailsAValue}
        inputFieldRef={visuospatialMiniTrailsARef}
        defaultFieldValue={""}
      >
        <TextField
          label="Visuospatial mini trails a"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentVisuospatialMiniTrailsAValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.visuospatialMiniTrailsA?.hasError) {
              runValidationTasks("visuospatialMiniTrailsA", value);
            }
            setCurrentVisuospatialMiniTrailsAValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "visuospatialMiniTrailsA",
              currentVisuospatialMiniTrailsAValue
            )
          }
          errorMessage={errors.visuospatialMiniTrailsA?.errorMessage}
          hasError={errors.visuospatialMiniTrailsA?.hasError}
          ref={visuospatialMiniTrailsARef}
          labelHidden={true}
          {...getOverrideProps(overrides, "visuospatialMiniTrailsA")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
