
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CallRecord, FollowUpAction } from '../types/callTypes';
import { formatDate, formatDateTime } from './dateUtils';
import { getCallHistory, getFollowUpActions } from '../services/callDataService';

export const generatePDF = (call: CallRecord) => {
  console.log('Generating PDF for call:', call.id);
  
  // Create a new jsPDF instance
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const followUpActions = getFollowUpActions(call.id);
  const callHistory = getCallHistory().slice(0, 5); // Get the 5 most recent calls
  
  // Add company logo/name header
  doc.setFillColor(65, 105, 225); // clinical-blue
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CLINICALL', pageWidth / 2, 15, { align: 'center' });
  
  // Add subtitle
  doc.setFontSize(12);
  doc.text('AI CLINICAL ASSISTANT - CALL SUMMARY', pageWidth / 2, 23, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Add patient info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Patient Information', 14, 35);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Patient: ${call.patient.name}`, 14, 45);
  doc.text(`Date: ${formatDate(call.date)}`, 14, 50);
  doc.text(`Call Duration: ${call.duration}`, 14, 55);
  doc.text(`Call Status: ${call.status.charAt(0).toUpperCase() + call.status.slice(1)}`, 14, 60);
  
  let yPos = 70;
  
  // Add summary info if available
  if (call.summary) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Call Summary', 14, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('MEDICATION ADHERENCE:', 14, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(call.summary.medicationAdherence, 14, yPos);
    yPos += 10;
    
    doc.setFont('helvetica', 'bold');
    doc.text('SYMPTOMS REPORTED:', 14, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(call.summary.symptomsReported, 14, yPos);
    yPos += 10;
    
    doc.setFont('helvetica', 'bold');
    doc.text('FOLLOW-UP REQUIRED:', 14, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(call.summary.followUpRequired, 14, yPos);
    yPos += 15;
  }
  
  // Add follow-up actions if available
  if (followUpActions.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Follow-up Actions', 14, yPos);
    yPos += 10;
    
    // Create the follow-up actions table
    const followUpTableData = followUpActions.map(action => [
      action.description,
      action.priority.charAt(0).toUpperCase() + action.priority.slice(1),
      action.dueDate,
      action.completed ? 'Completed' : 'Pending'
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Action', 'Priority', 'Due Date', 'Status']],
      body: followUpTableData,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [65, 105, 225] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Add recent call history
  if (callHistory.length > 0) {
    // Check if we need a new page
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recent Call History', 14, yPos);
    yPos += 10;
    
    // Create the call history table
    const callHistoryTableData = callHistory.map(callRecord => [
      formatDateTime(callRecord.date),
      callRecord.status === 'completed' ? callRecord.duration : '-',
      callRecord.status.charAt(0).toUpperCase() + callRecord.status.slice(1)
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Date & Time', 'Duration', 'Status']],
      body: callHistoryTableData,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [65, 105, 225] }
    });
  }
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Generated by Clinicall AI Clinical Assistant',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10
    );
  }
  
  // Save the PDF with a meaningful filename
  doc.save(`Clinicall_Summary_${call.patient.name}_${formatDate(call.date).replace(/\s/g, '_')}.pdf`);
};
