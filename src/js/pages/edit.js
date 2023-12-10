import CheckUserAuth from "./auth/check-auth-user";
import Transactions from "../network/transactions";

const Edit = {
    async init() {
        // CheckUserAuth.checkLoginState();
        
        this._initialUI();
        await this._initialData();
        this._initialListener();
    },
    _initialUI() {
        const listInputRadioTransactionType = [
          {
            inputId: 'recordType1',
            value: 'income',
            caption: 'Pemasukan',
            required: true,
          },
          {
            inputId: 'recordType2',
            value: 'expense',
            caption: 'Pengeluaran',
            required: true,
          },
        ];
        const inputRadioTransactionTypeEdit = document.querySelector('#inputRadioTransactionTypeEdit');
        inputRadioTransactionTypeEdit.setAttribute(
          'listRadio',
          JSON.stringify(listInputRadioTransactionType),
        );
      },    
    async _initialData() {
        // const transactionId = Number(this._getTransactionId());
        const transactionId = this._getTransactionId();

        if (!transactionId) {
            alert('Data dengan id yang dicari tidak ditemukan');
            return;
        }

        // const fetchRecords = await fetch('/data/DATA.json');
        // const responseRecords = await fetchRecords.json();
        // const userTransactionsHistory = responseRecords.results.transactionsHistory;

        // const dataRecord = userTransactionsHistory.find((item) => item.id === transactionId);

        // this._populateTransactionToForm(dataRecord);

        try {
          const response = await Transactions.getById(transactionId);
          // const responseRecord = response.data.results;
          this._userTransaction = response;

          this._populateTransactionToForm(response);
        } catch (error) {
          console.error(error);
        }
    },
    _initialListener() {
        // const evidenceInput = document.querySelector('#validationCustomEvidence');
        // evidenceInput.addEventListener('change', () => {
        //     this._updatePhotoPreview();
        // });

        const editRecordForm = document.querySelector('#editRecordForm');
        editRecordForm.addEventListener(
            'submit',
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                editRecordForm.classList.add('was-validated');
                this._sendPost();
            },
            false
        );
    },
    async _sendPost() {
        const formData = this._getFormData();

        if (this._validateFormData({ ...formData })) {
            console.log('formData');
            console.log(formData);

            try {
              if (formData.evidence) {
                Transactions.destroyEvidence(this._userTransaction.evidence);

                const storageResponse = await Transactions.storeEvidence(formData.evidence);
                formData.evidence = storageResponse.metadata.fullPath;
              }
              const response = await Transactions.update({
                id: this._getTransactionId(),
                ...formData
              });

              alert(`Transaction with id ${this._getTransactionId()} has been updated`);

              this._goToDashboardPage();
          } catch (error) {
              console.error(Error);
            }
        }
    },
    _getFormData() {
        const nameInput = document.querySelector('#validationCustomRecordName');
        const amountInput = document.querySelector('#validationCustomAmount');
        const dateInput = document.querySelector('#validationCustomDate');
        const evidenceInput = document.querySelector('#validationCustomEvidence');
        const descriptionInput = document.querySelector('#validationCustomNotes');
        const typeInput = document.querySelector('input[name=recordType]:checked');

        return {
            name: nameInput.value,
            amount: Number(amountInput.value),
            date: new Date(dateInput.value),
            evidence: evidenceInput.files[0],
            description: descriptionInput.value,
            type: typeInput.value
        };
    },
    // _updatePhotoPreview() {
    //     const evidenceImg = document.querySelector('#validationCustomEvidenceImg');
    //     const evidenceImgChange = document.querySelector('#validationCustomEvidenceImgChange');
    //     const evidenceImgInput = document.querySelector('#validationCustomEvidence');

    //     const photo = evidenceImgInput.files[0];
    //     if (!photo) return;

    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         evidenceImg.classList.add('d-none');
    //         evidenceImgChange.classList.remove('d-none');

    //         evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
    //     };

    //     reader.readAsDataURL(photo);
    // },
    _populateTransactionToForm(transactionRecord = null) {
        if (!(typeof transactionRecord === 'object')) {
            throw new Error(`Parameter transactionRecord should be an object. The value is ${transactionRecord}`);
        }

        const nameInput = document.querySelector('#validationCustomRecordName');
        const amountInput = document.querySelector('#validationCustomAmount');
        const dateInput = document.querySelector('#validationCustomDate');
        // const evidenceInput = document.querySelector('#validationCustomEvidenceImg');
        const inputImagePreviewEdit = document.querySelector('#inputImagePreviewEdit');
        const descriptionInput = document.querySelector('#validationCustomNotes');
        // const types = document.querySelectorAll('input[name="recordType"]');
        const inputRadioTransactionTypeEdit = document.querySelector('#inputRadioTransactionTypeEdit');
    
    
        nameInput.value = transactionRecord.name;
        amountInput.value = transactionRecord.amount;
        dateInput.value = transactionRecord.date.toDate().toISOString().slice(0, 16);
        // evidenceInput.setAttribute('src', transactionRecord.evidenceUrl);
        // evidenceInput.setAttribute('alt', transactionRecord.name);
        // inputImagePreviewEdit.setAttribute('defaultImage', transactionRecord.evidenceUrl);
        // inputImagePreviewEdit.setAttribute('defaultImageAlt', transactionRecord.name);

        Transactions.getEvidenceURL(transactionRecord.evidence)
          .then((url) => {
            inputImagePreviewEdit.setAttribute('defaultImage', url);
            inputImagePreviewEdit.setAttribute('defaultImageAlt', transactionRecord.name);
          })
          .catch((error) => {
            console.error(error);
          });

        descriptionInput.value = transactionRecord.description;
        // types.forEach((item) => {
        //     item.checked = item.value === transactionRecord.type;
        // });

        const listInputRadioTransactionType = JSON.parse(
            inputRadioTransactionTypeEdit.getAttribute('listRadio'),
          );
          listInputRadioTransactionType.forEach((item) => {
            item.checked = item.value === transactionRecord.type;
          });
          inputRadioTransactionTypeEdit.setAttribute(
            'listRadio',
            JSON.stringify(listInputRadioTransactionType),
          );
    },
    _validateFormData(formData) {
        delete formData.evidence;
        const formDataFiltered = Object.values(formData).filter((item) => item === '');
     
     
        return formDataFiltered.length === 0;
      },
      _getTransactionId() {
        const searchParamEdit = new URLSearchParams(window.location.search);
        return searchParamEdit.has('id') ? searchParamEdit.get('id') : null;
      },
      _goToDashboardPage() {
        window.location.href = '/';
      }
};

export default Edit;