import {
	Button,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import TextfieldWithErrorMessage from "./TextFieldWithErrorMessage";
import { IContactFormData, IFormInput } from "./types";
import { mapPhoneDataToInput, mapPhoneInputToData } from "./utils";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneSchema = yup.object().shape({
	number: yup
		.string()
		.transform((value) => (value === "" ? undefined : value))
		.matches(phoneRegExp, "Phone number is not valid")
		.optional(),
});

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	jobTitle: yup.string().optional(),
	address: yup.string().optional(),
	email: yup.string().email("Email address is not valid").optional(),
	phoneNumbers: yup.array().of(phoneSchema).required(),
	imageUrl: yup.string().optional(),
});

const defaultValues: IFormInput = {
	name: "",
	jobTitle: "",
	address: "",
	email: "",
	phoneNumbers: [{ number: "" }],
};

interface Props {
	initialValues?: IContactFormData;
	onCancel: () => void;
	onSubmitForm: (formData: IContactFormData) => void;
}

export default function ContactForm({
	initialValues,
	onCancel,
	onSubmitForm,
}: Props) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: initialValues
			? {
					...initialValues,
					phoneNumbers: mapPhoneDataToInput(
						initialValues.phoneNumbers
					),
			  }
			: defaultValues,
		resolver: yupResolver<IFormInput>(schema),
	});

	const {
		fields: phoneFields,
		append: appendPhoneField,
		remove: removePhoneField,
	} = useFieldArray({
		name: "phoneNumbers",
		control,
	});

	function onSubmit(data: IFormInput) {
		const formData = {
			...data,
			phoneNumbers: mapPhoneInputToData(data.phoneNumbers),
		};
		onSubmitForm(formData);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} direction={"column"} mt={1}>
				<TextfieldWithErrorMessage
					helperText={errors.name ? errors.name.message : null}
					error={Boolean(errors.name)}
					label={"Name"}
					{...register("name", {
						required: true,
						maxLength: 150,
					})}
				/>
				<TextfieldWithErrorMessage
					helperText={
						errors.jobTitle ? errors.jobTitle.message : null
					}
					error={Boolean(errors.jobTitle)}
					label={"Job Title"}
					{...register("jobTitle", { maxLength: 200 })}
				/>
				<TextfieldWithErrorMessage
					helperText={errors.address ? errors.address.message : null}
					error={Boolean(errors.address)}
					label={"Address"}
					{...register("address", { maxLength: 200 })}
				/>
				{phoneFields.map((field, index) => (
					<TextfieldWithErrorMessage
						key={field.id}
						type="tel"
						placeholder="Phone Number"
						error={Boolean(errors.phoneNumbers?.[index])}
						helperText={
							errors.phoneNumbers?.[index]?.number?.message
						}
						{...register(`phoneNumbers.${index}.number`)}
						slotProps={{
							input: {
								endAdornment: phoneFields.length > 1 && (
									<InputAdornment position="end">
										<IconButton
											edge={"end"}
											aria-label={`delete phone field ${index}`}
											onClick={() =>
												removePhoneField(index)
											}
										>
											<DeleteIcon />
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
				))}
				{phoneFields.length < 3 && (
					<Button
						variant="outlined"
						startIcon={<AddIcon />}
						onClick={() => appendPhoneField({ number: "" })}
					>
						Add a Phone Number
					</Button>
				)}
				<TextfieldWithErrorMessage
					helperText={errors.email ? errors.email.message : null}
					error={Boolean(errors.email)}
					label={"Email"}
					{...register("email")}
				/>
				<TextField
					helperText={
						errors.imageUrl ? errors.imageUrl.message : null
					}
					error={Boolean(errors.imageUrl)}
					label={"Image URL"}
					{...register("imageUrl")}
				/>
			</Stack>
			<Stack
				direction="row"
				spacing={2}
				mt={1}
				sx={{ justifyContent: "flex-end" }}
			>
				<Button onClick={onCancel}>Cancel</Button>
				<Button variant="contained" type="submit">
					Save Changes
				</Button>
			</Stack>
		</form>
	);
}
