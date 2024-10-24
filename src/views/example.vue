<div class="grid">
<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Name:</label>
  <p>{{ selected?.name }}</p>
</div>
<div class="col-12 md:col-6 lg:col-4  flex">
  <label class="block font-bold mr-2">Code:</label>
  <p>{{ selected?.code }}</p>
</div>
<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">HS Code:</label>
  <p>{{ selected?.hsCode }}</p>
</div>

<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Nature:</label>
  <p>{{ selected?.nature }}</p>
</div>
<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Group Code:</label>
  <p>{{ selected?.groupCode }}</p>
</div>
<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Category:</label>
  <p>{{ selected?.category?.name }}</p>
</div>

<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Vat %:</label>
  <p>{{ selected?.vatPercent }}</p>
</div>
<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Unit Group:</label>
  <p>{{ selected?.unitGroup?.name }}</p>
</div>
<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Local Barcode:</label>
  <p>{{ selectedLocalBarcode?.join(', ') }}</p>
</div>

<div class="col-12 md:col-6 lg:col-4 flex">
  <label class="block font-bold mr-2">Global Barcode:</label>
  <p>{{ selectedGlobalBarcode?.join(', ') }}</p>
</div>
</div>