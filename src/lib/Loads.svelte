<script lang="ts">
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";

    type Load = {
        id: string;
        client: string;
        plate: string;
        material: string;
        quantity: string;
        paymentMethod: string;
        signature: string;
    };

    const data: Load[] = Array.from({ length: 25 }).map((_, i) => ({
        id: i.toString(),
        paymentMethod: i % 2 ? "A vista" : "A prazo",
        quantity: ((i + 1) * 10).toString(),
        material: i % 2 ? "Saibro" : "Areia",
        plate: "ABC-1234",
        client: `Fulano ${i}`,
        signature: `signature-${i}`,
    }));

    const table = createTable(readable(data));

    const columns = table.createColumns([
        table.column({
            accessor: "id",
            header: "ID",
        }),
        table.column({
            accessor: "client",
            header: "Cliente",
        }),
        table.column({
            accessor: "plate",
            header: "Placa",
        }),
        table.column({
            accessor: "material",
            header: "Material",
        }),
        table.column({
            accessor: "quantity",
            header: "Quantidade",
        }),
        table.column({
            accessor: "paymentMethod",
            header: "Método de pagamento",
        }),
        table.column({
            accessor: "signature",
            header: "Assinatura",
        }),
    ]);

    const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
        table.createViewModel(columns);
</script>

<div class="rounded-md border">
    <h1 class="w-full text-center p-4 text-lg">Carregamentos</h1>
    <Table.Root {...$tableAttrs}>
        <Table.Header>
            {#each $headerRows as headerRow}
                <Subscribe rowAttrs={headerRow.attrs()}>
                    <Table.Row>
                        {#each headerRow.cells as cell (cell.id)}
                            <Subscribe
                                attrs={cell.attrs()}
                                let:attrs
                                props={cell.props()}
                            >
                                <Table.Head {...attrs}>
                                    <Render of={cell.render()} />
                                </Table.Head>
                            </Subscribe>
                        {/each}
                    </Table.Row>
                </Subscribe>
            {/each}
        </Table.Header>
        <Table.Body {...$tableBodyAttrs}>
            {#each $pageRows as row (row.id)}
                <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                    <Table.Row {...rowAttrs}>
                        {#each row.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs>
                                <Table.Cell {...attrs}>
                                    <Render of={cell.render()} />
                                </Table.Cell>
                            </Subscribe>
                        {/each}
                    </Table.Row>
                </Subscribe>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
