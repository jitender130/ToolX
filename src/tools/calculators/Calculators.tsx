import React, { useState } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';
import { Calculator, ArrowRight, RotateCcw, Check, Sparkles } from 'lucide-react';

/* 1. Height Calculator */
export const HeightCalculatorTool: React.FC = () => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cm, setCm] = useState<string>('175');
  const [feet, setFeet] = useState<string>('5');
  const [inches, setInches] = useState<string>('9');

  const cmVal = unit === 'cm' ? parseFloat(cm) || 0 : (parseFloat(feet) || 0) * 30.48 + (parseFloat(inches) || 0) * 2.54;
  const ftTotal = cmVal / 30.48;
  const calculatedFeet = Math.floor(ftTotal);
  const calculatedInches = Math.round((ftTotal - calculatedFeet) * 12);
  const meters = (cmVal / 100).toFixed(2);

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
          <button
            onClick={() => setUnit('cm')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              unit === 'cm' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (Centimeters)
          </button>
          <button
            onClick={() => setUnit('ft')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              unit === 'ft' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (Feet & Inches)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          {unit === 'cm' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Height (cm)</label>
              <input
                type="number"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                placeholder="e.g. 175"
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Feet</label>
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inches</label>
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                />
              </div>
            </div>
          )}
        </div>

        <ToolResult
          title="Converted Height Values"
          metrics={[
            { label: 'Centimeters', value: `${cmVal.toFixed(1)} cm`, highlight: true },
            { label: 'Feet & Inches', value: `${calculatedFeet} ft ${calculatedInches} in` },
            { label: 'Meters', value: `${meters} m` },
            { label: 'Inches Total', value: `${(cmVal / 2.54).toFixed(1)} in` },
          ]}
          copyText={`${cmVal.toFixed(1)} cm / ${calculatedFeet}ft ${calculatedInches}in`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 2. Age Calculator */
export const AgeCalculatorTool: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    const start = new Date(birthDate);
    const end = new Date(targetDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;

    // Next birthday calculation
    const nextBirthday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (nextBirthday < end) {
      nextBirthday.setFullYear(end.getFullYear() + 1);
    }
    const daysUntilNext = Math.ceil((nextBirthday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalHours, daysUntilNext };
  };

  const ageData = calculateAge();

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Age at Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
            />
          </div>
        </div>

        {ageData && (
          <ToolResult
            title="Calculated Exact Age"
            metrics={[
              { label: 'Exact Age', value: `${ageData.years} yrs ${ageData.months} mos`, highlight: true },
              { label: 'Days in Cycle', value: `${ageData.days} days` },
              { label: 'Total Days Lived', value: `${ageData.totalDays.toLocaleString()} days` },
              { label: 'Next Birthday in', value: `${ageData.daysUntilNext} days` },
            ]}
            copyText={`Age: ${ageData.years} years, ${ageData.months} months, ${ageData.days} days (${ageData.totalDays} total days)`}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 3. BMI Calculator */
export const BmiCalculatorTool: React.FC = () => {
  const [system, setSystem] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [weightLbs, setWeightLbs] = useState('154');

  const heightInMeters =
    system === 'metric'
      ? (parseFloat(heightCm) || 0) / 100
      : ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 0.0254;

  const weightInKg =
    system === 'metric' ? parseFloat(weightKg) || 0 : (parseFloat(weightLbs) || 0) * 0.453592;

  const bmi = heightInMeters > 0 ? (weightInKg / (heightInMeters * heightInMeters)).toFixed(1) : '0';
  const bmiNum = parseFloat(bmi);

  let category = 'Normal';
  let categoryColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (bmiNum < 18.5) {
    category = 'Underweight';
    categoryColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (bmiNum >= 25 && bmiNum < 30) {
    category = 'Overweight';
    categoryColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (bmiNum >= 30) {
    category = 'Obese';
    categoryColor = 'text-rose-600 bg-rose-50 border-rose-200';
  }

  // Ideal weight range for height
  const idealMinKg = (18.5 * heightInMeters * heightInMeters).toFixed(1);
  const idealMaxKg = (24.9 * heightInMeters * heightInMeters).toFixed(1);

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
          <button
            onClick={() => setSystem('metric')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              system === 'metric' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => setSystem('imperial')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              system === 'imperial' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (ft, in, lbs)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          {system === 'metric' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Height (ft)</label>
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Height (in)</label>
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
                />
              </div>
            </>
          )}
        </div>

        <ToolResult
          title="BMI Assessment Results"
          metrics={[
            { label: 'Your BMI Score', value: bmi, highlight: true },
            { label: 'WHO Category', value: category },
            { label: 'Normal Range', value: '18.5 – 24.9' },
            { label: 'Healthy Weight Span', value: `${idealMinKg} - ${idealMaxKg} kg` },
          ]}
          copyText={`BMI: ${bmi} (${category}), Healthy Range: ${idealMinKg}-${idealMaxKg} kg`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 4. Percentage Calculator */
export const PercentageCalculatorTool: React.FC = () => {
  const [val1, setVal1] = useState('15');
  const [val2, setVal2] = useState('200');
  const [valA, setValA] = useState('25');
  const [valB, setValB] = useState('100');

  const part1 = ((parseFloat(val1) || 0) / 100) * (parseFloat(val2) || 0);
  const part2 = (parseFloat(valB) || 0) !== 0 ? ((parseFloat(valA) || 0) / (parseFloat(valB) || 1)) * 100 : 0;

  return (
    <ToolWorkspace>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Calculate Percentage of a Number</h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-600">What is</span>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-24 px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
            />
            <span className="text-sm font-medium text-slate-600">% of</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-32 px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
            />
            <span className="text-sm font-medium text-slate-600">=</span>
            <span className="text-lg font-bold text-emerald-600 tabular-nums px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200">
              {part1.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Calculate Percentage Share</h3>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={valA}
              onChange={(e) => setValA(e.target.value)}
              className="w-24 px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
            />
            <span className="text-sm font-medium text-slate-600">is what % of</span>
            <input
              type="number"
              value={valB}
              onChange={(e) => setValB(e.target.value)}
              className="w-32 px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
            />
            <span className="text-sm font-medium text-slate-600">=</span>
            <span className="text-lg font-bold text-emerald-600 tabular-nums px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200">
              {part2.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </ToolWorkspace>
  );
};

/* 5. EMI Calculator */
export const EmiCalculatorTool: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('50000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenureYears, setTenureYears] = useState('5');

  const P = parseFloat(loanAmount) || 0;
  const annualR = parseFloat(interestRate) || 0;
  const N = (parseFloat(tenureYears) || 0) * 12;

  const monthlyR = annualR / (12 * 100);
  const emi =
    P > 0 && monthlyR > 0 && N > 0
      ? (P * monthlyR * Math.pow(1 + monthlyR, N)) / (Math.pow(1 + monthlyR, N) - 1)
      : 0;

  const totalPayment = emi * N;
  const totalInterest = totalPayment - P;

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Amount ($)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Tenure (Years)</label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden text-sm font-medium"
            />
          </div>
        </div>

        <ToolResult
          title="Repayment Summary"
          metrics={[
            { label: 'Monthly EMI', value: `$${emi.toFixed(2)}`, highlight: true },
            { label: 'Total Interest Payable', value: `$${totalInterest.toFixed(2)}` },
            { label: 'Total Payment (P + I)', value: `$${totalPayment.toFixed(2)}` },
            { label: 'Number of EMIs', value: `${N} months` },
          ]}
          copyText={`Monthly EMI: $${emi.toFixed(2)}, Total Interest: $${totalInterest.toFixed(2)}, Total Amount: $${totalPayment.toFixed(2)}`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 6. CGPA Calculator */
export const CgpaCalculatorTool: React.FC = () => {
  const [courses, setCourses] = useState([
    { name: 'Course 1', gradePoints: '9', credits: '4' },
    { name: 'Course 2', gradePoints: '8', credits: '3' },
    { name: 'Course 3', gradePoints: '10', credits: '3' },
    { name: 'Course 4', gradePoints: '7', credits: '4' },
  ]);

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, gradePoints: '8', credits: '3' }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: 'gradePoints' | 'credits', val: string) => {
    const updated = [...courses];
    updated[index][field] = val;
    setCourses(updated);
  };

  let totalCredits = 0;
  let weightedPoints = 0;
  courses.forEach((c) => {
    const pts = parseFloat(c.gradePoints) || 0;
    const cr = parseFloat(c.credits) || 0;
    totalCredits += cr;
    weightedPoints += pts * cr;
  });

  const cgpa = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : '0.00';
  const percentage = (parseFloat(cgpa) * 9.5).toFixed(1);

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 w-20">Course {idx + 1}</span>
              <input
                type="number"
                step="0.1"
                placeholder="Grade Points (e.g. 9)"
                value={course.gradePoints}
                onChange={(e) => updateCourse(idx, 'gradePoints', e.target.value)}
                className="w-36 px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
              <input
                type="number"
                placeholder="Credits (e.g. 4)"
                value={course.credits}
                onChange={(e) => updateCourse(idx, 'credits', e.target.value)}
                className="w-28 px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
              {courses.length > 1 && (
                <button
                  onClick={() => removeCourse(idx)}
                  className="text-xs text-rose-500 hover:text-rose-700 px-2 py-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addCourse}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          + Add Course
        </button>

        <ToolResult
          title="Academic Score Breakdown"
          metrics={[
            { label: 'Calculated CGPA', value: cgpa, highlight: true },
            { label: 'Approximate %', value: `${percentage}%` },
            { label: 'Total Credits', value: `${totalCredits}` },
            { label: 'Total Weighted Pts', value: `${weightedPoints.toFixed(1)}` },
          ]}
          copyText={`CGPA: ${cgpa}, Total Credits: ${totalCredits}, Approx Percentage: ${percentage}%`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 7. Average Calculator */
export const AverageCalculatorTool: React.FC = () => {
  const [inputNumbers, setInputNumbers] = useState('12, 45, 67, 23, 89, 34, 56');

  const numbers = inputNumbers
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const count = numbers.length;
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = count > 0 ? sum / count : 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted.length > 0 ? sorted[0] : 0;
  const max = sorted.length > 0 ? sorted[sorted.length - 1] : 0;
  const median =
    sorted.length > 0
      ? sorted.length % 2 !== 0
        ? sorted[Math.floor(sorted.length / 2)]
        : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : 0;

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Enter Numbers (separated by commas or spaces)
          </label>
          <textarea
            rows={3}
            value={inputNumbers}
            onChange={(e) => setInputNumbers(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <ToolResult
          title="Statistical Analysis"
          metrics={[
            { label: 'Mean / Average', value: average.toFixed(2), highlight: true },
            { label: 'Median', value: median.toFixed(2) },
            { label: 'Total Sum', value: sum.toFixed(2) },
            { label: 'Range (Min - Max)', value: `${min} – ${max}` },
          ]}
          copyText={`Average: ${average.toFixed(2)}, Median: ${median.toFixed(2)}, Sum: ${sum}`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 8. Discount Calculator */
export const DiscountCalculatorTool: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('120');
  const [discountPercent, setDiscountPercent] = useState('25');
  const [taxPercent, setTaxPercent] = useState('8');

  const price = parseFloat(originalPrice) || 0;
  const discountRate = parseFloat(discountPercent) || 0;
  const taxRate = parseFloat(taxPercent) || 0;

  const savings = (price * discountRate) / 100;
  const discountedPrice = price - savings;
  const taxAmount = (discountedPrice * taxRate) / 100;
  const finalPrice = discountedPrice + taxAmount;

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Original Price ($)</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Discount (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sales Tax (%)</label>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
        </div>

        <ToolResult
          title="Price & Savings Breakdown"
          metrics={[
            { label: 'Final Payable Price', value: `$${finalPrice.toFixed(2)}`, highlight: true },
            { label: 'You Save', value: `$${savings.toFixed(2)}` },
            { label: 'Discounted Subtotal', value: `$${discountedPrice.toFixed(2)}` },
            { label: 'Tax Amount', value: `$${taxAmount.toFixed(2)}` },
          ]}
          copyText={`Final Price: $${finalPrice.toFixed(2)}, Savings: $${savings.toFixed(2)}`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 9. Time Calculator */
export const TimeCalculatorTool: React.FC = () => {
  const [startTime, setStartTime] = useState('09:15');
  const [endTime, setEndTime] = useState('17:45');

  const [h1, m1] = startTime.split(':').map(Number);
  const [h2, m2] = endTime.split(':').map(Number);

  let totalMinutes = (h2 * 60 + m2) - (h1 * 60 + m1);
  if (totalMinutes < 0) totalMinutes += 24 * 60;

  const diffHours = Math.floor(totalMinutes / 60);
  const diffMins = totalMinutes % 60;
  const decimalHours = (totalMinutes / 60).toFixed(2);

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
        </div>

        <ToolResult
          title="Calculated Duration"
          metrics={[
            { label: 'Total Duration', value: `${diffHours}h ${diffMins}m`, highlight: true },
            { label: 'Decimal Hours', value: `${decimalHours} hrs` },
            { label: 'Total Minutes', value: `${totalMinutes} min` },
            { label: 'Total Seconds', value: `${totalMinutes * 60} s` },
          ]}
          copyText={`Duration: ${diffHours} hours and ${diffMins} minutes (${decimalHours} decimal hours)`}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 10. Unit Converter */
export const UnitConverterTool: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
  const [value, setValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');

  const convert = () => {
    const val = parseFloat(value) || 0;
    if (category === 'length') {
      const toMeters: Record<string, number> = {
        meters: 1,
        kilometers: 1000,
        centimeters: 0.01,
        millimeters: 0.001,
        miles: 1609.34,
        feet: 0.3048,
        inches: 0.0254,
      };
      const inMeters = val * (toMeters[fromUnit] || 1);
      return (inMeters / (toMeters[toUnit] || 1)).toFixed(4);
    } else if (category === 'weight') {
      const toKg: Record<string, number> = {
        kilograms: 1,
        grams: 0.001,
        pounds: 0.453592,
        ounces: 0.0283495,
      };
      const inKg = val * (toKg[fromUnit] || 1);
      return (inKg / (toKg[toUnit] || 1)).toFixed(4);
    } else if (category === 'temperature') {
      if (fromUnit === toUnit) return val.toFixed(2);
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return ((val * 9) / 5 + 32).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (((val - 32) * 5) / 9).toFixed(2);
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return (val + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return (val - 273.15).toFixed(2);
    }
    return '0';
  };

  const unitsByCategory: Record<string, string[]> = {
    length: ['meters', 'kilometers', 'centimeters', 'feet', 'inches', 'miles'],
    weight: ['kilograms', 'grams', 'pounds', 'ounces'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
  };

  const result = convert();

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
          {(['length', 'weight', 'temperature'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setFromUnit(unitsByCategory[cat][0]);
                setToUnit(unitsByCategory[cat][1]);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold capitalize rounded-lg transition-colors ${
                category === cat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium capitalize"
            >
              {unitsByCategory[category].map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">To Unit</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium capitalize"
            >
              {unitsByCategory[category].map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <ToolResult
          title="Conversion Result"
          metrics={[
            { label: 'Converted Value', value: `${result} ${toUnit}`, highlight: true },
            { label: 'Original Value', value: `${value} ${fromUnit}` },
          ]}
          copyText={`${value} ${fromUnit} = ${result} ${toUnit}`}
        />
      </div>
    </ToolWorkspace>
  );
};
