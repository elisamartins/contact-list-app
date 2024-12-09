import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { IContact } from "../../src/types";

export function setUpMockServer(allContacts: IContact[]) {
	return setupServer(
		http.get("http://localhost:3000/contacts", () => {
			return HttpResponse.json(allContacts);
		}),
		http.post("http://localhost:3000/contacts", async ({ request }) => {
			const newContact: any = await request.json();
			allContacts.push(newContact);
			return HttpResponse.json(newContact, { status: 201 });
		}),
		http.put(
			"http://localhost:3000/contact/:id",
			async ({ request, params }) => {
				const { id } = params;
				const updatedContact: any = await request.json();

				allContacts = allContacts.map((c) => {
					if (c.id == id) {
						return {
							...c,
							...updatedContact,
						};
					}
					return c;
				});

				return HttpResponse.json(updatedContact, { status: 201 });
			}
		),
		http.delete("ttp://localhost:3000/contact/:id", ({ params }) => {
			const { id } = params;
			const deletedContact = allContacts.find((c) => c.id == id);
			if (!deletedContact) {
				return new HttpResponse(null, { status: 404 });
			}
			allContacts = allContacts.filter((c) => c.id != id);
			return HttpResponse.json(deletedContact);
		})
	);
}
