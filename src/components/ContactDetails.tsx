import { Avatar, Divider, Grid2, IconButton, Typography } from "@mui/material";
import { IContact } from "../types";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

interface Props {
	contact: IContact;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export default function ContactDetails({ contact, onClickEdit, onClickDelete }: Props) {
	return (
		<Grid2>
			<Grid2 container direction="row">
				<Avatar src={contact.imageUrl} />
				<Grid2 container>
					<Typography>{contact.name}</Typography>
					<Typography>{contact.jobTitle}</Typography>
				</Grid2>
			</Grid2>
			<Divider />
            <Grid2 container direction="column">
                <Typography>{contact.address}</Typography>
                <Typography>{contact.email}</Typography>
                {contact.phoneNumbers?.map(phone => <Typography key={phone}>{phone}</Typography>)}
            </Grid2>

            <IconButton onClick={onClickEdit}>
                <Edit/>
            </IconButton>

            <IconButton onClick={onClickDelete}>
                <Delete/>
            </IconButton>
		</Grid2>
	);
}
