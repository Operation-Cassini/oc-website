/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SaturnTestDataCreateFormInputValues = {
    totalPoints?: number;
    totalTime?: number;
    executiveMiniTrailsB?: string[];
    executiveStroop?: string[];
    math?: string[];
    meanPredictiveZScores?: string[];
    memoryFiveWords?: string[];
    memoryIncidental?: string[];
    motorSpeed?: string[];
    orientation?: string[];
    readingSpeed?: string[];
    simpleAttention?: string[];
    visuospatialImageCombos?: string[];
    visuospatialMiniTrailsA?: string[];
};
export declare type SaturnTestDataCreateFormValidationValues = {
    totalPoints?: ValidationFunction<number>;
    totalTime?: ValidationFunction<number>;
    executiveMiniTrailsB?: ValidationFunction<string>;
    executiveStroop?: ValidationFunction<string>;
    math?: ValidationFunction<string>;
    meanPredictiveZScores?: ValidationFunction<string>;
    memoryFiveWords?: ValidationFunction<string>;
    memoryIncidental?: ValidationFunction<string>;
    motorSpeed?: ValidationFunction<string>;
    orientation?: ValidationFunction<string>;
    readingSpeed?: ValidationFunction<string>;
    simpleAttention?: ValidationFunction<string>;
    visuospatialImageCombos?: ValidationFunction<string>;
    visuospatialMiniTrailsA?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SaturnTestDataCreateFormOverridesProps = {
    SaturnTestDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    totalPoints?: PrimitiveOverrideProps<TextFieldProps>;
    totalTime?: PrimitiveOverrideProps<TextFieldProps>;
    executiveMiniTrailsB?: PrimitiveOverrideProps<TextAreaFieldProps>;
    executiveStroop?: PrimitiveOverrideProps<TextAreaFieldProps>;
    math?: PrimitiveOverrideProps<TextAreaFieldProps>;
    meanPredictiveZScores?: PrimitiveOverrideProps<TextAreaFieldProps>;
    memoryFiveWords?: PrimitiveOverrideProps<TextAreaFieldProps>;
    memoryIncidental?: PrimitiveOverrideProps<TextAreaFieldProps>;
    motorSpeed?: PrimitiveOverrideProps<TextAreaFieldProps>;
    orientation?: PrimitiveOverrideProps<TextAreaFieldProps>;
    readingSpeed?: PrimitiveOverrideProps<TextAreaFieldProps>;
    simpleAttention?: PrimitiveOverrideProps<TextAreaFieldProps>;
    visuospatialImageCombos?: PrimitiveOverrideProps<TextAreaFieldProps>;
    visuospatialMiniTrailsA?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type SaturnTestDataCreateFormProps = React.PropsWithChildren<{
    overrides?: SaturnTestDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SaturnTestDataCreateFormInputValues) => SaturnTestDataCreateFormInputValues;
    onSuccess?: (fields: SaturnTestDataCreateFormInputValues) => void;
    onError?: (fields: SaturnTestDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SaturnTestDataCreateFormInputValues) => SaturnTestDataCreateFormInputValues;
    onValidate?: SaturnTestDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function SaturnTestDataCreateForm(props: SaturnTestDataCreateFormProps): React.ReactElement;
