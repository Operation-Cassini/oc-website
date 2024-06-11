/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SaturnTestDataUpdateFormInputValues = {
    testScore?: number;
};
export declare type SaturnTestDataUpdateFormValidationValues = {
    testScore?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SaturnTestDataUpdateFormOverridesProps = {
    SaturnTestDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    testScore?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SaturnTestDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: SaturnTestDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    saturnTestData?: any;
    onSubmit?: (fields: SaturnTestDataUpdateFormInputValues) => SaturnTestDataUpdateFormInputValues;
    onSuccess?: (fields: SaturnTestDataUpdateFormInputValues) => void;
    onError?: (fields: SaturnTestDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SaturnTestDataUpdateFormInputValues) => SaturnTestDataUpdateFormInputValues;
    onValidate?: SaturnTestDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SaturnTestDataUpdateForm(props: SaturnTestDataUpdateFormProps): React.ReactElement;
