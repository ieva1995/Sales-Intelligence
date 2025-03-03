import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CRMMenu from "@/components/CRMMenu";

const sampleContacts = [
  {
    firstName: "Brian (Sample Contact)",
    lastName: "Halligan",
    email: "bh@hubspot.com",
    jobTitle: "Executive Chairperson",
    leadStatus: "Open"
  },
  {
    firstName: "Maria (Sample Contact)",
    lastName: "Johnson",
    email: "emailmaria@hubspot.com",
    jobTitle: "Salesperson",
    leadStatus: "New"
  }
];

export default function CRM() {
  return (
    <div className="flex">
      {/* CRM Menu */}
      <div className="w-64 flex-shrink-0">
        <CRMMenu />
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8 pl-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground">Manage your contacts and leads.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add contacts to see your CRM in action</CardTitle>
            <p className="text-sm text-muted-foreground">
              We've added sample contacts, add some of your own to get set up faster.
            </p>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mb-6">
              Sync my Google contacts
            </Button>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Lead Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleContacts.map((contact, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.jobTitle}</TableCell>
                    <TableCell>{contact.leadStatus}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="p-0">
                    <Input className="border-0" placeholder="Enter first name" />
                  </TableCell>
                  <TableCell className="p-0">
                    <Input className="border-0" placeholder="Enter last name" />
                  </TableCell>
                  <TableCell className="p-0">
                    <Input className="border-0" placeholder="Enter email" />
                  </TableCell>
                  <TableCell className="p-0">
                    <Input className="border-0" placeholder="Enter job title" />
                  </TableCell>
                  <TableCell className="p-0">
                    <Input className="border-0" placeholder="Enter status" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-6">
              <Button className="w-full">
                Continue
              </Button>
              <Button variant="link" className="w-full mt-2">
                Skip and use sample contacts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}