import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { IContactFormData } from "../types";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneSchema = yup.object().shape({
	number: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.optional(),
});

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	jobTitle: yup.string().optional(),
	address: yup.string().optional(),
	email: yup.string().email("Email address is not valid").optional(),
	phoneNumbers: yup.array().of(phoneSchema).optional(),
	imageUrl: yup.string().optional(),
});

interface IPhoneInput {
	number?: string;
}

interface IFormInput {
	name: string;
	jobTitle?: string;
	address?: string;
	email?: string;
	phoneNumbers?: IPhoneInput[];
	imageUrl?: string;
}

const defaultValues: IFormInput = {
	name: "",
	jobTitle: "",
	address: "",
	email: "",
	phoneNumbers: [{ number: "" }],
};

const mapPhoneDataToInput = (phoneNumbers: string[]) => {
	const result = phoneNumbers.map((phone) => ({
		number: phone,
	}));
	return result.length > 0
		? result
		: [
				{
					number: "",
				},
		  ];
};

const mapPhoneInputToData = (phoneNumbers?: IPhoneInput[]) => {
	return phoneNumbers
		? phoneNumbers
				.filter((phone) => phone.number)
				.map((phone) => phone.number as string)
		: [];
};

interface Props {
	open: boolean;
	initialValues?: IContactFormData;
	onClose: () => void;
	onSubmitForm: (formData: IContactFormData) => void;
}

export default function ContactFormDialog({
	open,
	initialValues,
	onClose,
	onSubmitForm,
}: Props) {
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
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
		<Dialog
			open={open}
			fullWidth
			maxWidth="xs"
			fullScreen={mobile}
			onClose={onClose}
		>
			<DialogTitle>
				{initialValues ? "Update" : "Add a"} Contact
			</DialogTitle>
			<DialogContent>
				<form>
					<Stack spacing={2} direction={"column"} mt={1}>
						<TextField
							helperText={
								errors.name ? errors.name.message : null
							}
							size="small"
							error={Boolean(errors.name)}
							fullWidth
							label={"Name"}
							variant="outlined"
							{...register("name", {
								required: true,
								maxLength: 150,
							})}
						/>
						<TextField
							helperText={
								errors.jobTitle ? errors.jobTitle.message : null
							}
							size="small"
							error={Boolean(errors.jobTitle)}
							fullWidth
							label={"Job Title"}
							variant="outlined"
							{...(register("name"), { maxLength: 200 })}
						/>
						<TextField
							helperText={
								errors.address ? errors.address.message : null
							}
							size="small"
							error={Boolean(errors.address)}
							fullWidth
							label={"Address"}
							variant="outlined"
							{...(register("address"), { maxLength: 200 })}
						/>
						{phoneFields.map((field, index) => (
							<TextField
								key={field.id}
								size="small"
								type="tel"
								placeholder="Phone Number"
								fullWidth
								error={Boolean(errors.phoneNumbers?.[index])}
								helperText={
									errors.phoneNumbers?.[index]?.number
										?.message
								}
								{...register(`phoneNumbers.${index}.number`)}
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													edge={"end"}
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
						<TextField
							helperText={
								errors.email ? errors.email.message : null
							}
							size="small"
							error={Boolean(errors.email)}
							fullWidth
							label={"Email"}
							variant="outlined"
							{...register("email")}
						/>
						<TextField
							helperText={
								errors.imageUrl ? errors.imageUrl.message : null
							}
							size="small"
							error={Boolean(errors.imageUrl)}
							fullWidth
							label={"Image URL"}
							variant="outlined"
							{...register("imageUrl")}
						/>
					</Stack>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" onClick={handleSubmit(onSubmit)}>
					Save Changes
				</Button>
			</DialogActions>
		</Dialog>
	);
}
