import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
} from "./table";

function Sample() {
  return (
    <Table>
      <TableCaption>Deploys</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>mlz-design</TableCell>
          <TableCell>54s</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  // The caption is what names the table for assistive tech — a paragraph above
  // it wouldn't be associated.
  it("is named by its caption", () => {
    render(<Sample />);
    expect(screen.getByRole("table", { name: "Deploys" })).toBeInTheDocument();
  });

  it("exposes real column headers", () => {
    render(<Sample />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.map((h) => h.textContent)).toEqual(["Project", "Duration"]);
    expect(headers[0]).toHaveAttribute("scope", "col");
  });

  it("exposes rows and cells", () => {
    render(<Sample />);
    // Header row + body row.
    expect(screen.getAllByRole("row")).toHaveLength(2);
    const [, bodyRow] = screen.getAllByRole("row");
    expect(within(bodyRow as HTMLElement).getAllByRole("cell")).toHaveLength(2);
  });

  it("makes the first column a row header with scope=row", () => {
    render(
      <Table aria-label="Tokens">
        <TableBody>
          <TableRow>
            <TableHead scope="row">--background</TableHead>
            <TableCell>paper</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("rowheader", { name: "--background" })).toBeInTheDocument();
  });

  // Without this a keyboard user can't reach the far columns of a wide table.
  it("wraps itself in a focusable scroll container", () => {
    const { container } = render(<Sample />);
    const scroller = container.querySelector('[data-slot="table-container"]');
    expect(scroller).toHaveAttribute("tabindex", "0");
    expect(scroller?.className).toContain("overflow-x-auto");
    // Deliberately not a landmark: an unnamed region is worse than none.
    expect(scroller).not.toHaveAttribute("role");
  });

  it("renders a footer for totals", () => {
    render(
      <Table aria-label="Minutes">
        <TableBody>
          <TableRow>
            <TableCell>mlz-design</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("keeps caller classes alongside its own", () => {
    const { container } = render(
      <Table className="text-xs" containerClassName="rounded-md" aria-label="x">
        <TableBody>
          <TableRow>
            <TableCell>a</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("table").className).toContain("text-xs");
    expect(container.querySelector('[data-slot="table-container"]')?.className).toContain(
      "rounded-md",
    );
  });
});

describe("Table sorting affordance", () => {
  it("exposes the order through aria-sort", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sort="asc">Name</TableHead>
            <TableHead sort="none">Age</TableHead>
            <TableHead>Plain</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    // "none" and absent both mean unsorted; neither should emit the attribute.
    expect(screen.getByRole("columnheader", { name: "Age" })).not.toHaveAttribute("aria-sort");
    expect(screen.getByRole("columnheader", { name: "Plain" })).not.toHaveAttribute("aria-sort");
  });

  it("makes the header operable through TableSortButton", () => {
    const onClick = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sort="desc">
              <TableSortButton sort="desc" onClick={onClick}>
                Age
              </TableSortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Age" }));
    expect(onClick).toHaveBeenCalled();
  });
});
