import styles from '../styles/ui/InvoiceForm.module.css';
import { useToggleWindow } from '../contexts/FormWindowContext';
import { FiPlusCircle } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Context, InvoiceItems } from '../types/types';
import { useFieldArray, useForm } from 'react-hook-form';
import { useUpdateInvoice } from '../hooks/invoices/useUpdateInvoice';
import useGetUser from '../hooks/user/useGetUser';
import { useEffect, useState } from 'react';
import useGetInvoice from '../hooks/invoices/useGetInvoice';
import { generateID } from '../helpers/generateID';
import MiniSpinner from '../components/MiniSpinner';

function InvoiceForm() {
  const { toggle, handleToggle }: Context = useToggleWindow();
  const { register, handleSubmit, formState, reset, control } = useForm();
  const { updateInvoiceData, isProcessing } = useUpdateInvoice();
  const { user } = useGetUser();
  const { getInvoice } = useGetInvoice();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itemList',
  });

  const { errors } = formState;

  const userInvoices = getInvoice?.find(
    (invoice) => invoice.user_id === user?.id
  );

  const [invoices, setInvoices] = useState<Array<InvoiceItems>>([]);

  useEffect(() => {
    async function loadInvoices() {
      const allInvoices = userInvoices?.user_invoices || [];
      setInvoices(allInvoices);
    }

    loadInvoices();
  }, [userInvoices]);

  if (!user) return;
  const { id } = user;

  function handleCancel(e: React.FormEvent) {
    e.preventDefault();
    handleToggle?.();
  }

  function onSubmit(data: InvoiceItems) {
    console.log(data);

    const status = data.draft ? 'draft' : 'pending';

    setInvoices((invoice) => [
      { ...data, id: generateID(), status },
      ...invoice,
    ]);
    updateInvoiceData({
      id,
      invoices: [{ ...data, id: generateID(), status }, ...invoices],
    });

    handleToggle?.();
    reset();
  }

  return (
    <div className={`${styles.container} ${toggle && styles.open}`}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a new invoice</h1>
        <div className={styles.formContainer}>
          <div className={styles.billFrom}>
            <h5>Bill From</h5>
            <div className={styles.layout}>
              <label htmlFor='streetFrom'>
                Street Address
                <span className={styles.error}>
                  {errors?.senderStreet?.message?.toString()}
                </span>
              </label>
              <input
                id='streetFrom'
                type='text'
                placeholder='ex. 19 Union Terrace'
                {...register('senderStreet', {
                  required: 'This field is required',

                  minLength: {
                    value: 4,
                    message: 'Minimum 4 characters',
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor='cityFrom'>
                City
                <span className={styles.error}>
                  {errors?.senderCity?.message?.toString()}
                </span>
              </label>
              <input
                id='cityFrom'
                type='text'
                placeholder='ex. London'
                {...register('senderCity', {
                  required: 'Required',

                  minLength: {
                    value: 4,
                    message: 'Min. 4',
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor='postalCodeFrom'>
                Postal Code
                <span className={styles.error}>
                  {errors?.senderPostCode?.message?.toString()}
                </span>
              </label>
              <input
                id='postalCodeFrom'
                type='text'
                placeholder='ex. 99423'
                {...register('senderPostCode', {
                  required: 'Required',

                  minLength: {
                    value: 4,
                    message: 'Min. 4',
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor='countryFrom'>
                Country
                <span className={styles.error}>
                  {errors?.senderCountry?.message?.toString()}
                </span>
              </label>
              <input
                id='countryFrom'
                type='text'
                placeholder='ex. United Kingdom'
                {...register('senderCountry', {
                  required: 'Required',

                  minLength: {
                    value: 4,
                    message: 'Min. 4',
                  },
                })}
              />
            </div>
          </div>

          <div className={styles.billTo}>
            <h5>Bill To</h5>

            <div className={styles.layout}>
              <label htmlFor='clientName'>
                Client's Name
                <span className={styles.error}>
                  {errors?.clientName?.message?.toString()}
                </span>
              </label>
              <input
                id='clientName'
                type='text'
                placeholder='ex. Alex Johnson'
                {...register('clientName', {
                  required: 'This field is required',

                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters',
                  },
                })}
              />
            </div>

            <div className={styles.layout}>
              <label htmlFor='clientEmail'>
                Client's Email
                <span className={styles.error}>
                  {errors?.clientEmail?.message?.toString()}
                </span>
              </label>
              <input
                id='clientEmail'
                type='text'
                placeholder='ex. alex.johnson@gmail.com'
                {...register('clientEmail', {
                  required: 'This field is required',

                  validate: (value) =>
                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                    'Invalid e-mail address',
                })}
              />
            </div>

            <div className={styles.layout}>
              <label htmlFor='streetTo'>
                Street Address
                <span className={styles.error}>
                  {errors?.clientStreet?.message?.toString()}
                </span>
              </label>
              <input
                id='streetTo'
                type='text'
                placeholder='ex. 84 Church Way'
                {...register('clientStreet', {
                  required: 'This field is required',

                  minLength: {
                    value: 4,
                    message: 'Minimum 4 characters',
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor='cityTo'>
                City
                <span className={styles.error}>
                  {errors?.clientCity?.message?.toString()}
                </span>
              </label>
              <input
                id='cityTo'
                type='text'
                placeholder='ex. Bradford'
                {...register('clientCity', {
                  required: 'Required',

                  minLength: {
                    value: 4,
                    message: 'Min. 4',
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor='postalCodeTo'>
                Postal Code
                <span className={styles.error}>
                  {errors?.clientPostCode?.message?.toString()}
                </span>
              </label>
              <input
                id='postalCodeTo'
                type='text'
                placeholder='ex. 87656'
                {...register('clientPostCode', {
                  required: 'Required',

                  minLength: {
                    value: 4,
                    message: 'Min. 4',
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor='countryTo'>
                Country
                <span className={styles.error}>
                  {errors?.clientCountry?.message?.toString()}
                </span>
              </label>
              <input
                id='countryTo'
                type='text'
                placeholder='ex. United Kingdom'
                {...register('clientCountry', {
                  required: 'Required',

                  minLength: {
                    value: 4,
                    message: 'Min. 4',
                  },
                })}
              />
            </div>
          </div>

          <div className={styles.additionalInfo}>
            <div>
              <label htmlFor='date'>
                Invoice Date
                <span className={styles.error}>
                  {errors?.createdAt?.message?.toString()}
                </span>
              </label>
              <input
                id='date'
                type='date'
                placeholder='ex. 25.03.24'
                {...register('createdAt', {
                  required: 'Field is required',
                })}
              />
            </div>

            <div>
              <label htmlFor='paymentTerms'>
                Payment Terms
                <span className={styles.error}>
                  {errors?.paymentTerms?.message?.toString()}
                </span>
              </label>
              <select
                {...register('paymentTerms', {
                  required: 'Field is required',
                  validate: (value) =>
                    value !== 'default' || 'Field is required',
                })}
              >
                <option value='default' className={styles.default}>
                  Select Days
                </option>
                <option value={1}>1 day</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>

            <div className={styles.layout}>
              <label htmlFor='description'>
                Description
                <span className={styles.error}>
                  {errors?.description?.message?.toString()}
                </span>
              </label>
              <input
                id='description'
                type='text'
                placeholder='ex. Design Managing'
                {...register('description', {
                  required: 'This field is required',

                  minLength: {
                    value: 5,
                    message: 'Minimum 5 characters',
                  },
                })}
              />
            </div>
          </div>

          <div className={styles.itemsList}>
            <h5>Item list</h5>

            <div>
              <div className={styles.labels}>
                <p className={styles.itemLabel}>Item name</p>
                <p className={styles.quantityLabel}>Qty.</p>
                <p className={styles.priceLabel}>Price</p>
              </div>

              {fields.map((item, index) => {
                return (
                  <div className={styles.item} key={item.id}>
                    <input
                      id='itemName'
                      type='text'
                      placeholder='ex. User Desktop Design'
                      {...register(`itemList.${index}.itemName`, {
                        required: true,
                      })}
                    />
                    <input
                      id='quantity'
                      type='text'
                      defaultValue={1}
                      {...register(`itemList.${index}.itemQuantity`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    <input
                      id='price'
                      type='text'
                      placeholder='ex. 400'
                      {...register(`itemList.${index}.itemPrice`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />

                    <span onClick={() => remove(index)}>
                      <MdDelete />
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              className={styles.newItem}
              onClick={(e) => {
                e.preventDefault();
                append([
                  {
                    itemName: '',
                    itemQuantity: 1,
                    itemPrice: '',
                  },
                ]);
              }}
            >
              <span>
                <FiPlusCircle />
              </span>
              Add New Item
            </button>
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={styles.draft}>
            <input id='draft' type='checkbox' {...register('draft')} />
            <label htmlFor='draft'>Save as Draft</label>
          </div>

          <div>
            <button className={styles.cancel} onClick={(e) => handleCancel(e)}>
              Cancel
            </button>
            <button
              className={styles.submit}
              type='submit'
              disabled={isProcessing}
            >
              {isProcessing ? (
                <MiniSpinner color='blck' />
              ) : (
                'Create New Invoice'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
