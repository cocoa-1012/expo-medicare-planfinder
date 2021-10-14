const fields = {
  "Fields": [
      {
          "Title": "Entry Id",
          "Type": "text",
          "ID": "EntryId"
      },
      {
          "Title": "How did you locate the Medicare FactFinder®?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Google Play"
              },
              {
                  "Label": "Apple App Store"
              },
              {
                  "Label": "Online search"
              },
              {
                  "Label": "Client referral"
              },
              {
                  "Label": "Other"
              }
          ],
          "Type": "radio",
          "ID": "Field4567",
          "HasOtherField": true
      },
      {
          "Title": "Who provides your current Health Insurance Plan?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Select your Plan Sponsor"
              },
              {
                  "Label": "Medicare"
              },
              {
                  "Label": "My Employer"
              },
              {
                  "Label": "Veteran Benefits"
              },
              {
                  "Label": "My Union"
              },
              {
                  "Label": "Affordable Care Act"
              },
              {
                  "Label": "Other"
              }
          ],
          "Type": "select",
          "ID": "Field3955",
          "HasOtherField": false
      },
      {
          "Title": "Full Name",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "",
                  "ID": "Field2",
                  "Label": "First"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field3",
                  "Label": "Last"
              }
          ],
          "Type": "shortname",
          "ID": "Field2"
      },
      {
          "Title": "Date of Birth",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "date",
          "ID": "Field16"
      },
      {
          "Title": "Current Age",
          "Instructions": "Providing your age is helpful but optional",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field1039"
      },
      {
          "Title": "What is your Height & Weight?",
          "Instructions": "Example 5, 7, 160 lbs",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field4259"
      },
      {
          "Title": "Address",
          "Instructions": "P.O. Boxes are not allowed.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "",
                  "ID": "Field4",
                  "Label": "Street Address"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field5",
                  "Label": "Address Line 2"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field6",
                  "Label": "City"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field7",
                  "Label": "State / Province / Region"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field8",
                  "Label": "Postal / Zip Code"
              },
              {
                  "DefaultVal": "United States",
                  "ID": "Field9",
                  "Label": "Country"
              }
          ],
          "Type": "address",
          "ID": "Field4"
      },
      {
          "Title": "What County in your State do you live in?",
          "Instructions": "Providing the County where you live is necessary for plan selection.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field4230"
      },
      {
          "Title": "Cellphone or Primary Phone Number",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "phone",
          "ID": "Field11"
      },
      {
          "Title": "Alternate Phone Number",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "phone",
          "ID": "Field3819"
      },
      {
          "Title": "Personal Email Address",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "email",
          "ID": "Field12"
      },
      {
          "Title": "Suggest a date for a telephone consultation. Allow 5 business day from today (Mon - Fri)",
          "Instructions": "Allow 5 business days to process your Report prior to the requested consultation date/time. A Benefit Advisor will contacted you to confirm the appointment day & time.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "date",
          "ID": "Field1"
      },
      {
          "Title": "Suggest the time for the consultation (9:30AM - 4PM EASTERN Time Zone)",
          "Instructions": "You will be contacted to confirm the appointment.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "time",
          "ID": "Field1510"
      },
      {
          "Title": "Would you like your Medicare Plan Comparison Report delivered by Email or USPS?",
          "Instructions": "Your report will be delivered at least 2 days prior to your scheduled telephone consultation.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Email"
              },
              {
                  "Label": "USPS"
              }
          ],
          "Type": "radio",
          "ID": "Field4106",
          "HasOtherField": false
      },
      {
          "Title": "Scope of Appointment Confirmation. Select the product(s) you wish to discuss. Check all that apply.",
          "Instructions": "By making a selection you agree to schedule a telephone consultation to discuss the product(s) selected.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "0",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "0",
                  "ID": "Field4261",
                  "Label": "Medicare Advantage Plans (Part C)"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4262",
                  "Label": "Medicare Supplement Plans (Medigap)"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4263",
                  "Label": "Presciption Drug Plans (Part D)"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4264",
                  "Label": "Long Term Care"
              }
          ],
          "Type": "checkbox",
          "ID": "Field4261"
      },
      {
          "Title": "Provide your Electronic Signature including First Name, Last Name & Date",
          "Instructions": "Your first, last name and today's date are necessary to document to CMS your agreement to discuss specific Medicare plans. Charles Wright, License P057782 in CA, CO, FL, GA, IA,  MD, MI, MN, NC, NY, OH, SC, TX, UT, VA is appointed by Medicare plan providers. He does not work directly for the Federal government. He may be paid by the Medicare plan provider based on your enrollment in a plan. Signing does not obligate you to enroll in a plan, affect your current enrollment, or enroll you in a Medicare plan. Health&Wealth Advisors is authorized to contact the Medicare Beneficiary by telephone and use email communications to complete the Medicare plan enrollment process on behalf of the Medicare Beneficiary. The information provided is true and accurate to the best of my knowledge. Submission of this form documents the Medicare Beneficiary's agreement with these terms and conditions.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field1852"
      },
      {
          "Title": "What kind of Medicare plan do you currently have?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Select an option"
              },
              {
                  "Label": "Not enrolled in Medicare yet"
              },
              {
                  "Label": "Original Medicare Part A & B"
              },
              {
                  "Label": "Original Medicare + Part D drug plan"
              },
              {
                  "Label": "Original Medicare+Medigap Plan F+Part D drug plan"
              },
              {
                  "Label": "Original Medicare+Medigap Plan G+Part D drug plan"
              },
              {
                  "Label": "Original Medicare + Medicaid"
              },
              {
                  "Label": "Medicare Advantage HMO Plan"
              },
              {
                  "Label": "Medicare Advantage PPO Plan"
              },
              {
                  "Label": "Medicare Advantage Special Needs Plan"
              },
              {
                  "Label": "Employer Plan + Part B"
              }
          ],
          "Type": "select",
          "ID": "Field1746",
          "HasOtherField": false
      },
      {
          "Title": "Medicare Claim Number (Optional) enables preparation of a more accurate plan comparison.",
          "Instructions": "The Claim Number allows preparation of a detailed comparison of Medicare plans utilizing your Medicare.gov account information.. The Medicare Claim Number is printed on your red, white and blue Medicare card. It is not required to complete this Medicare Plan Comparison. The Medicare claim number is required to enroll you in a Medicare Supplement, Medicare Advantage or Part D drug plan.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field2678"
      },
      {
          "Title": "Medicare Part A Effective Date",
          "Instructions": "The Part A date is located on your red, white and blue Medicare Claim Card.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "date",
          "ID": "Field1515"
      },
      {
          "Title": "Medicare Part B Effective Date",
          "Instructions": "The Part B date is located on your red, white and blue Medicare Claim Card after your enroll in Medicare Part B.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "date",
          "ID": "Field1516"
      },
      {
          "Title": "Are you, or do you anticipate, receiving any of these benefits? Check any that apply.",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "0",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "0",
                  "ID": "Field2682",
                  "Label": "Medicaid"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field2683",
                  "Label": "Extra Help (Low Income Subsidy)"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field2685",
                  "Label": "Veterans Hospital & Medications"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field2686",
                  "Label": "Not Applicable"
              }
          ],
          "Type": "checkbox",
          "ID": "Field2682"
      },
      {
          "Title": "What is your Medicaid ID number?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field3940"
      },
      {
          "Title": "Do you have an family member, friend or Authorized Representative that helps you make important decision?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "No"
              },
              {
                  "Label": "If Yes, please provide their name & phone number."
              }
          ],
          "Type": "radio",
          "ID": "Field3971",
          "HasOtherField": true
      },
      {
          "Title": "What is your current monthly health insurance premium?",
          "Instructions": "If you  do not pay a premium enter 0.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "number",
          "ID": "Field3172"
      },
      {
          "Title": "What is your current health insurance deductible?",
          "Instructions": "This is the amount you pay before your plan pays any medical claims.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "number",
          "ID": "Field3957"
      },
      {
          "Title": "What is your Annual Maximum Out Of Pocket limit?",
          "Instructions": "This is your maximum annual out of pocket claim exposure.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "number",
          "ID": "Field3960"
      },
      {
          "Title": "Motivation for enrolling in a Medicare plan?",
          "Instructions": "Typically you may only  enroll in a Medicare plan during the Annual Election Period between October 15th and December 7th. There are exceptions that allow enrollment in a Medicare plan outside the Annual Enrollment Period. Select the Special Election Period you believe applies to you.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Select the Election Period that applies to you"
              },
              {
                  "Label": "Leaving an employer health insurance plan"
              },
              {
                  "Label": "Turning age 65 or New to Medicare"
              },
              {
                  "Label": "Aging into Medicare @Age 65"
              },
              {
                  "Label": "Annual Enrollment Period"
              },
              {
                  "Label": "Moved from another State or County"
              },
              {
                  "Label": "I qualify for Extra Help (Low Income Subsidy)"
              },
              {
                  "Label": "Under age 65 with a qualifying disability"
              },
              {
                  "Label": "Medicare + Medicaid beneficiary"
              },
              {
                  "Label": "Diagnosed with diabetes, heart disease or COPD"
              },
              {
                  "Label": "Other - Explain in comments section"
              }
          ],
          "Type": "select",
          "ID": "Field1743",
          "HasOtherField": false
      },
      {
          "Title": "What is the Zipcode of your previous residence?",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "number",
          "ID": "Field3838"
      },
      {
          "Title": "When did you move into your current residence?",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "date",
          "ID": "Field3835"
      },
      {
          "Title": "Have you notified Social Security of the change of address?",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "No"
              },
              {
                  "Label": "Yes"
              }
          ],
          "Type": "radio",
          "ID": "Field3826",
          "HasOtherField": false
      },
      {
          "Title": "What month & year do you want your Medicare plan to become effective?",
          "Instructions": "Your Medicare plan becomes effective the 1st day of the month selected.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "date",
          "ID": "Field3167"
      },
      {
          "Title": "Do you receive a Health Insurance Subsidy that reduces the cost of Medicare? If so, how much annually?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "0"
              },
              {
                  "Label": "Yes, this amount on an annual basis."
              }
          ],
          "Type": "radio",
          "ID": "Field3029",
          "HasOtherField": true
      },
      {
          "Title": "What is your most important Medicare planning goal?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Reduce plan costs while keeping my doctors"
              },
              {
                  "Label": "Freedom to see any Doctor or Provider"
              },
              {
                  "Label": "Reducing the cost of health insurance"
              },
              {
                  "Label": "Reducing the cost of prescription medications"
              },
              {
                  "Label": "Compare Employer Vs Medicare Plan costs"
              }
          ],
          "Type": "radio",
          "ID": "Field4233",
          "HasOtherField": false
      },
      {
          "Title": "What is your estimated annual household income?",
          "Instructions": "The estimate combined annual income of yourself and spouse.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field3179"
      },
      {
          "Title": "What is the maximum monthly premium you are willing to pay for a Medicare plan in addition to your Part B Premium?",
          "Instructions": "What is the maximum premium you are willing to pay from $-0- to $400 per month for a plan that accomplishes your goals.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "number",
          "ID": "Field4253"
      },
      {
          "Title": "Do you smoke?",
          "Instructions": "",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "No"
              },
              {
                  "Label": "Yes"
              },
              {
                  "Label": "Participating in a smoking cessation program"
              }
          ],
          "Type": "select",
          "ID": "Field4088",
          "HasOtherField": false
      },
      {
          "Title": "What Value-Added Benefits do you need?",
          "Instructions": "Which of these Value-Added Benefit will influence your Medicare plan selection?",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "0",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "0",
                  "ID": "Field4465",
                  "Label": "Vision"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4466",
                  "Label": "Preventative dental"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4467",
                  "Label": "Extractions"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4468",
                  "Label": "Endodontics"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4469",
                  "Label": "Periodontics"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4470",
                  "Label": "Fitness benefits"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4471",
                  "Label": "Transportation"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4472",
                  "Label": "Hearing aids"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4473",
                  "Label": "Over the counter drugs"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4474",
                  "Label": "In-home support services"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4475",
                  "Label": "Home & bathroom safety devices"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4476",
                  "Label": "Telehealth"
              },
              {
                  "DefaultVal": "0",
                  "ID": "Field4477",
                  "Label": "Not applicable"
              }
          ],
          "Type": "checkbox",
          "ID": "Field4465"
      },
      {
          "Title": "Have you been diagnosed with any of these condition:\nEnd Stage Renal Disease\nDiabetes\nCardio Vascular Disease\nCOPD Chronic Obstructive Pulmonary Disease",
          "Instructions": "A diagnosis of any of these chronic illnesses is a qualifier for enrollment in a Medicare Advantage Special Needs Plan (SNP) providing specialized benefits and cost savings. Individuals diagnosed with End State Renal Disease are not eligible to enroll in a Medicare Advantage plan.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "No"
              },
              {
                  "Label": "If Yes, which one?"
              }
          ],
          "Type": "radio",
          "ID": "Field4213",
          "HasOtherField": true
      },
      {
          "Title": "Describe your general health status?",
          "Instructions": "Your general healthcare risk exposure will influence the type of Medicare plan recommended.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Health status?"
              },
              {
                  "Label": "Excellent"
              },
              {
                  "Label": "Good"
              },
              {
                  "Label": "Fair"
              },
              {
                  "Label": "Poor"
              }
          ],
          "Type": "select",
          "ID": "Field4094",
          "HasOtherField": false
      },
      {
          "Title": "Primary Care Physician (PCP) - Must be a Medical Doctor",
          "Instructions": "The Primary Care Physician information is required to determine the provider networks they participate in. If you need a new Primary Care Physician type \"New\" in the First Name and Last Name field.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "",
                  "ID": "Field1261",
                  "Label": "First"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field1262",
                  "Label": "Last"
              }
          ],
          "Type": "shortname",
          "ID": "Field1261"
      },
      {
          "Title": "PCP Phone Number",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "phone",
          "ID": "Field1637"
      },
      {
          "Title": "Specialist #1",
          "Instructions": "Leave this blank only if you are willing to change your specialist.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "",
                  "ID": "Field1269",
                  "Label": "First"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field1270",
                  "Label": "Last"
              }
          ],
          "Type": "shortname",
          "ID": "Field1269"
      },
      {
          "Title": "Specialist#1 Phone Number",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "phone",
          "ID": "Field3153"
      },
      {
          "Title": "Medical Specialty",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field1504"
      },
      {
          "Title": "Specialist #2",
          "Instructions": "Leave this blank only if you are willing to change your specialist.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "SubFields": [
              {
                  "DefaultVal": "",
                  "ID": "Field1271",
                  "Label": "First"
              },
              {
                  "DefaultVal": "",
                  "ID": "Field1272",
                  "Label": "Last"
              }
          ],
          "Type": "shortname",
          "ID": "Field1271"
      },
      {
          "Title": "Specialist#2 Phone Number",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "phone",
          "ID": "Field3154"
      },
      {
          "Title": "Medical Specialty",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field1505"
      },
      {
          "Title": "How many different medications do you take on a regular basis?",
          "Instructions": "Provide name, dosage and frequency for each medication. For more than 12 medications use Comments field.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "number",
          "ID": "Field4250"
      },
      {
          "Title": "What is the name of your pharmacy?",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field1638"
      },
      {
          "Title": "Medication #1-3                  Dose/Frequency 3 Per Line",
          "Instructions": "Provide up to 3 medication names, dosage and frequency in this field. Example: metformin 800mg 1x, metoprolol 25mg 1x, farxiga 10mg 1x",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field1631"
      },
      {
          "Title": "Medication #4-6                    Dose/Frequency 3 Per Line",
          "Instructions": "Provide up to 3 medication names, dosage and frequency in this field. Example: metformin 800mg 1x, metoprolol 25mg 1x, farxiga 10mg 1x",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field2469"
      },
      {
          "Title": "Medication #7-9                     Dose/Frequency 3 Per Line",
          "Instructions": "Provide up to 3 medication names, dosage and frequency in this field. Example: metformin 800mg 1x, metoprolol 25mg 1x, farxiga 10mg 1x",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field2468"
      },
      {
          "Title": "Medication #10-12                    Dose/Frequency 3 Per Line",
          "Instructions": "Provide up to 3 medication names, dosage and frequency in this field. Example: metformin 800mg 1x, metoprolol 25mg 1x, farxiga 10mg 1x",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field2467"
      },
      {
          "Title": "How do you prefer to be contacted by your Benefit Advisor, Cell phone, Text or Email?",
          "Instructions": "Provide your Cell Phone or Text number below if different from the telephone number already provided.",
          "IsRequired": "1",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Choices": [
              {
                  "Label": "Text"
              },
              {
                  "Label": "Email"
              },
              {
                  "Label": "Cell phone"
              }
          ],
          "Type": "radio",
          "ID": "Field4109",
          "HasOtherField": false
      },
      {
          "Title": "Describe recent medical risks and/or comments regarding your healthcare needs.",
          "Instructions": "Provide additional health related details you deem appropriate.",
          "IsRequired": "0",
          "ClassNames": "",
          "DefaultVal": "",
          "Page": "1",
          "Type": "textarea",
          "ID": "Field1487"
      },
      {
          "Title": "User Registration Field",
          "Instructions": "",
          "IsRequired": "0",
          "ClassNames": "hide",
          "DefaultVal": "",
          "Page": "1",
          "Type": "text",
          "ID": "Field4256"
      },
      {
          "Title": "Date Created",
          "Type": "date",
          "ID": "DateCreated"
      },
      {
          "Title": "Created By",
          "Type": "text",
          "ID": "CreatedBy"
      },
      {
          "Title": "Last Updated",
          "Type": "date",
          "ID": "LastUpdated"
      },
      {
          "Title": "Updated By",
          "Type": "text",
          "ID": "UpdatedBy"
      }
  ]
};

export default fields;