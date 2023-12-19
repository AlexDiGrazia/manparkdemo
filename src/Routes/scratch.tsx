/* <td key={`day-of-the-week-0`}>
              <ul>
                {sunday.length ? (
                  sunday.map((obj, index) => (
                    <li key={`day-sunday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td>
            <td key={`day-of-the-week-1`}>
              <ul>
                {monday.length ? (
                  monday.map((obj, index) => (
                    <li key={`day-monday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td>
            <td key={`day-of-the-week-2`}>
              <ul>
                {tuesday.length ? (
                  tuesday.map((obj, index) => (
                    <li key={`day-tuesday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td>
            <td key={`day-of-the-week-3`}>
              <ul>
                {wednesday.length ? (
                  wednesday.map((obj, index) => (
                    <li key={`day-wednesday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td>
            <td key={`day-of-the-week-4`}>
              <ul>
                {thursday.length ? (
                  thursday.map((obj, index) => (
                    <li key={`day-thursday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td>
            <td key={`day-of-the-week-5`}>
              <ul>
                {friday.length ? (
                  friday.map((obj, index) => (
                    <li key={`day-friday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td>
            <td key={`day-of-the-week-6`}>
              <ul>
                {saturday.length ? (
                  saturday.map((obj, index) => (
                    <li key={`day-saturday-event-${index}`}>{obj.event}</li>
                  ))
                ) : (
                  <li>{"No Data"}</li>
                )}
              </ul>
            </td> */

/* <td key={`day-of-the-week-${array[0].day}`}>
              <ul>
                {array.map((obj, index) => (
                  <li key={`day-${array[0]}-event-${index}`}>
                    {obj.day === 1 ? obj.event : "No Data"}
                  </li>
                ))}
              </ul>
            </td>
            <td key={`day-of-the-week-${array[0].day}`}>
              <ul>
                {array.map((obj, index) => (
                  <li key={`day-${array[0]}-event-${index}`}>
                    {obj.day === 2 ? obj.event : "No Data"}
                  </li>
                ))}
              </ul>
            </td>
            <td key={`day-of-the-week-${array[0].day}`}>
              <ul>
                {array.map((obj, index) => (
                  <li key={`day-${array[0]}-event-${index}`}>
                    {obj.day === 3 ? obj.event : "No Data"}
                  </li>
                ))}
              </ul>
            </td>
            <td key={`day-of-the-week-${array[0].day}`}>
              <ul>
                {array.map((obj, index) => (
                  <li key={`day-${array[0]}-event-${index}`}>
                    {obj.day === 4 ? obj.event : "No Data"}
                  </li>
                ))}
              </ul>
            </td>
            <td key={`day-of-the-week-${array[0].day}`}>
              <ul>
                {array.map((obj, index) => (
                  <li key={`day-${array[0]}-event-${index}`}>
                    {obj.day === 5 ? obj.event : "No Data"}
                  </li>
                ))}
              </ul>
            </td>
            <td key={`day-of-the-week-${array[0].day}`}>
              <ul>
                {array.map((obj, index) => (
                  <li key={`day-${array[0]}-event-${index}`}>
                    {obj.day === 6 ? obj.event : "No Data"}
                  </li>
                ))}
              </ul>
            </td> */

/* {array[0].day === 0 ? (
                  <td key={`day-of-the-week-${array[0].day}`}>
                    <ul>
                      {array.map((obj, index) => (
                        <li key={`day-${array[0]}-event-${index}`}>
                          {obj.day === 0 ? obj.event : "No Data"}
                        </li>
                      ))}
                    </ul>
                  </td>
                ) : (
                  <td key={`day-of-the-week-${array[0].day}`}>
                    <ul>
                      <li>{"No Data"}</li>
                    </ul>
                  </td>
                )} 
                {array[0].day === 1 ? (
                  <td key={`day-of-the-week-${array[0].day}`}>
                    <ul>
                      {array.map((obj, index) => (
                        <li key={`day-${array[0]}-event-${index}`}>
                          {obj.day === 0 ? obj.event : "No Data"}
                        </li>
                      ))}
                    </ul>
                  </td>
                ) : (
                  <td key={`day-of-the-week-${array[0].day}`}>
                    <ul>
                      <li>{"No Data"}</li>
                    </ul>
                  </td>
                )} */

/* Object.values(
              scheduleData
                .toSorted((a: TSchedules, b: TSchedules) => a.day - b.day)
                .reduce((acc: ScheduleEventsPerDay, obj: TSchedules) => {
                  acc[obj.day] = [...(acc[obj.day] || []), obj];
                  return acc;
                }, {})
            ) */
