import { Avatar, Divider, Grid2, Typography } from "@mui/material";
import { IContact } from "../types";

interface Props {
	contact: IContact;
}

export default function ContactDetails({ contact }: Props) {
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
		</Grid2>
	);
}
